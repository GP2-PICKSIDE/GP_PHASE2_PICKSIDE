function createTimerHelpers({ io, rooms }) {
  function emitRoomState(code) {
    const room = rooms.get(code);
    if (!room) return;
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
    });
  }

  function scheduleDeadline(code) {
    const room = rooms.get(code);
    if (!room) return;
    clearTimeout(room._deadlineTimer);
    const ms = Math.max(0, room.deadline - Date.now());
    room._deadlineTimer = setTimeout(() => {
      if (room.gameState === "in_round") endRound(code);
    }, ms + 50);
  }

  function startNextRound(code) {
    const room = rooms.get(code);
    if (!room) return;

    room.roundIndex += 1;

    if (room.roundIndex >= room.questions.length) {
      room.gameState = "summary";
      clearTimeout(room._deadlineTimer);
      io.to(code).emit("room:state", {
        code,
        gameState: room.gameState,
        roomName: room.roomName,
        settings: room.settings,
        players: Object.values(room.players),
        roundIndex: room.roundIndex,
        history: room.history,
        hostId: room.hostId,
      });
      return;
    }

    room.gameState = "in_round";
    room.question = room.questions[room.roundIndex];
    room.deadline = Date.now() + 15_000; // 15 detik per ronde
    emitRoomState(code);
    scheduleDeadline(code);
  }

  function endRound(code) {
    const room = rooms.get(code);
    if (!room) return;

    room.gameState = "reveal";
    const current = room.questions[room.roundIndex];

    const tally = { A: 0, B: 0 };
    Object.values(current.votes || {}).forEach((c) => {
      if (c === "B") tally.B++;
      else tally.A++;
    });

    const voters = Object.entries(current.votes || {}).map(([id, choice]) => ({ id, choice }));

    clearTimeout(room._deadlineTimer);
    const nextAt = Date.now() + 5_000;
    io.to(code).emit("round:reveal", {
      code,
      roundIndex: room.roundIndex,
      question: { question: current.question, options: current.options },
      tally,
      voters,
      nextAt,
    });

    room._deadlineTimer = setTimeout(() => startNextRound(code), 5_000);
  }

  return { scheduleDeadline, emitRoomState, endRound };
}

module.exports = { createTimerHelpers };
