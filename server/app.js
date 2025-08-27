if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const generateRoomCode = require("./helpers/generateRoomCode");
const { generateQuestion } = require("./services/generateQuestion");
const { createTimerHelpers } = require("./helpers/scheduleTimer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// room container
const rooms = new Map();
const { scheduleDeadline, emitRoomState, endRound } = createTimerHelpers({
  io,
  rooms,
});

function normalizeChoice(x) {
  const c = String(x ?? "")
    .trim()
    .toUpperCase();
  if (c === "A" || c === "B") return c;
  return null;
}

io.on("connection", (socket) => {
  console.log(`User ${socket.id} is connected`);

  socket.on("room:create", ({ name, roomName }) => {
    if (typeof name !== "string" || name.length < 2 || name.length > 32) {
      return socket.emit("room:error", { message: "Invalid name" });
    }
    if (roomName && roomName.length > 40) {
      return socket.emit("room:error", { message: "Invalid room name" });
    }

    const code = generateRoomCode(5);
    const hostId = socket.id;

    const room = {
      code,
      hostId,
      gameState: "lobby",
      roomName: roomName,
      settings: { theme: "funny", lang: "id", rounds: 5 },
      players: { [socket.id]: { id: socket.id, name, connected: true } },
      roundIndex: 0,
      history: [],
      deadline: null,
    };
    rooms.set(code, room);

    socket.data.roomCode = code;
    socket.join(code);

    io.to(code).emit("room:state", {
      code,
      gameState: room.gameState,
      roomName: room.roomName,
      settings: room.settings,
      players: Object.values(room.players),
      roundIndex: room.roundIndex,
      hostId: room.hostId,
      history: room.history,
    });
    console.log(`Room with code "${code}" created by "${name}"`);
  });

  socket.on("room:join", ({ code, name }) => {
    code = (code || "").toUpperCase();
    const room = rooms.get(code);
    if (!room) return socket.emit("room:error", { message: "Room not found" });

    room.players[socket.id] = { id: socket.id, name, connected: true };
    socket.data.roomCode = code;
    socket.join(code);

    io.to(code).emit("room:state", {
      code,
      gameState: room.gameState,
      roomName: room.roomName,
      settings: room.settings,
      players: Object.values(room.players),
      roundIndex: room.roundIndex,
      hostId: room.hostId,
      history: room.history,
    });

    console.log(`${name} joined room with code ${code}`);
  });

  socket.on("room:settings", ({ code, theme, lang, rounds }) => {
    code = (code || "").toUpperCase();
    const room = rooms.get(code);
    if (!room) return socket.emit("room:error", { message: "Room not found" });

    if (socket.id !== room.hostId) {
      return socket.emit("room:error", { message: "NOT_HOST" });
    }

    const next = { ...room.settings };
    if (typeof theme === "string") next.theme = theme;
    if (typeof lang === "string") next.lang = lang;
    if (typeof rounds !== "undefined") next.rounds = Number(rounds);

    room.settings = next;

    io.to(code).emit("room:state", {
      code,
      gameState: room.gameState,
      roomName: room.roomName,
      settings: room.settings,
      players: Object.values(room.players),
      roundIndex: room.roundIndex,
      hostId: room.hostId,
      history: room.history,
    });
  });

  socket.on("room:start", async ({ code, settings }) => {
    code = (code || "").toUpperCase();
    const room = rooms.get(code);
    if (!room) return socket.emit("room:error", { message: "Room not found" });

    room.settings = { ...room.settings, ...settings };
    const items = await generateQuestion({
      rounds: room.settings.rounds,
      theme: room.settings.theme || "funny",
      lang: room.settings.lang || "id",
    });

    room.questions = items.map((x) => ({ ...x, votes: {} }));
    room.roundIndex = 0;
    room.gameState = "in_round";
    room.question = room.questions[0];
    room.deadline = Date.now() + 15_000;

    io.to(code).emit("room:state", {
      code,
      gameState: room.gameState,
      roomName: room.roomName,
      settings: room.settings,
      deadline: room.deadline,
      players: Object.values(room.players),
      roundIndex: room.roundIndex,
      question: room.question,
      hostId: room.hostId,
      history: room.history,
    });

    scheduleDeadline(code);
  });

  socket.on("round:vote", ({ code, choice }) => {
    code = (code || "").toUpperCase();
    const room = rooms.get(code);
    if (!room || room.gameState !== "in_round") return;

    const pid = socket.id;
    const current = room.questions[room.roundIndex];
    if (!current.votes) current.votes = {};

    const norm = normalizeChoice(choice);
    if (!norm) return;
    current.votes[pid] = norm;

    room.question = current;
    emitRoomState(code);

    const totalPlayers = Object.values(room.players).filter(
      (p) => p.connected
    ).length;
    const totalVotes = Object.keys(current.votes).filter(
      (id) => room.players[id]?.connected
    ).length;

    if (totalVotes >= totalPlayers) endRound(code);
  });

  socket.on("room:restart", ({ code }) => {
    const room = rooms.get(code);
    if (!room) return;

    if (room._deadlineTimer) clearTimeout(room._deadlineTimer);

    room.gameState = "lobby";
    room.roundIndex = 0;
    room.deadline = 0;
    room.question = null;
    room.reveal = null;
    room.history = [];

    io.to(code).emit("room:state", {
      code,
      gameState: room.gameState,
      roomName: room.roomName,
      settings: room.settings,
      players: Object.values(room.players),
      roundIndex: room.roundIndex,
      deadline: room.deadline,
      question: room.question,
      hostId: room.hostId,
      history: room.history,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);

    const code = socket.data.roomCode;
    const room = rooms.get(code);
    if (!room) return;

    if (room.players[socket.id]) {
      room.players[socket.id].connected = false;
    }

    // kalau host keluar → promosikan host baru yang masih connected
    if (room.hostId === socket.id) {
      const connectedIds = Object.keys(room.players).filter(
        (id) => room.players[id].connected
      );
      room.hostId = connectedIds[0] || null;
    }

    io.to(code).emit("room:state", {
      code,
      gameState: room.gameState,
      roomName: room.roomName,
      settings: room.settings,
      question: room.question,
      deadline: room.deadline,
      players: Object.values(room.players),
      roundIndex: room.roundIndex,
      hostId: room.hostId,
      history: room.history,
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
