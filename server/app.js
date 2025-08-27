if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require("./routers");
const cors = require("cors");
const generateRoomCode = require("./helpers/generateRoomCode");
const generateAi = require("../server/controllers/ControllerAi");

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

io.on("connection", (socket) => {
  console.log(`User ${socket.id} is connected`);

  socket.on("room:create", ({ name, roomName }) => {
    if (typeof name !== "string" || name.length < 2 || name.length > 32) {
      return socket.emit("room:error", { message: "INVALID_NAME" });
    }
    if (roomName && roomName.length > 40) {
      return socket.emit("room:error", { message: "INVALID_ROOM_NAME" });
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
      settings: room.settings,
      players: Object.values(room.players),
      roundIndex: room.roundIndex,
      totalRounds: room.settings.rounds,
      hostId: room.hostId,
    });
    console.log(
      `Room name "${name}" with code "${code}" created by "${hostId}"`
    );
  });

  socket.on("room:join", ({ code, name }) => {
    code = (code || "").toUpperCase();
    const room = rooms.get(code);
    if (!room) return socket.emit("room:error", { message: "ROOM_NOT_FOUND" });

    room.players[socket.id] = { id: socket.id, name, connected: true };
    socket.data.roomCode = code;
    socket.join(code);

    io.to(code).emit("room:state", {
      code,
      gameState: room.gameState,
      settings: room.settings,
      players: Object.values(room.players),
      roundIndex: room.roundIndex,
      totalRounds: room.settings.rounds,
      hostId: room.hostId,
    });

    console.log(`${name} joined room with code ${code}`);
  });

  socket.on("generate_question", async ({ roomCode, theme, lang }) => {
    const questionData = await generateAi(theme, lang);
    io.to(roomCode).emit("new_question", questionData);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);

    const code = socket.data.roomCode;
    const room = rooms.get(code);
    if (!room) return;

    // hapus player
    delete room.players[socket.id];

    // host yang keluar → promosikan host baru (jika ada)
    if (room.hostId === socket.id) {
      const ids = Object.keys(room.players);
      room.hostId = ids[0] || null;
    }

    // kosong → hapus room dan selesai
    if (Object.keys(room.players).length === 0) {
      rooms.delete(code);
      return;
    }

    io.to(code).emit("room:state", {
      code,
      gameState: room.gameState,
      settings: room.settings,
      players: Object.values(room.players),
      roundIndex: room.roundIndex,
      totalRounds: room.settings.rounds,
      hostId: room.hostId,
    });
  });
});

// router
app.use(router);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
