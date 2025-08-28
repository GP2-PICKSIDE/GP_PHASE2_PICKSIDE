import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import useSocketStore from "./socketStore";
import useAllStore from ".";

const useGameStore = create(
  immer((set) => ({
    me: { id: null, name: "" },

    code: null,
    roomName: "",
    isHost: false,
    settings: { theme: "funny", lang: "id", rounds: 5 },

    gameState: "idle",
    players: [],
    roundIndex: 0,
    deadline: null,
    question: null,
    history: [],

    FnCreateRoom: () => {
      const { displayName: name, roomName } = useAllStore.getState();
      const { socketState } = useSocketStore.getState();

      if (name.length < 2) throw "Invalid name";
      if (roomName.length < 2) throw "Invalid room name";

      set((state) => {
        state.me.id = socketState.id;
        state.me.name = name.trim();
        state.roomName = roomName;
        state.isHost = true;
      });

      socketState.emit("room:create", {
        name: name.trim(),
        roomName,
      });
    },

    FnJoinRoom: () => {
      const { displayName: name, roomCode } = useAllStore.getState();
      const { socketState } = useSocketStore.getState();

      if (name.length < 2) throw "Invalid name";
      if (roomCode.length < 2) throw "Invalid room code";

      set((state) => {
        state.me.id = socketState.id;
        state.me.name = name.trim();
        state.code = roomCode;
      });

      socketState.emit("room:join", {
        code: roomCode,
        name: name.trim(),
      });
    },

    FnStartRoom: () => {
      const { socketState } = useSocketStore.getState();
      const { code, settings } = useGameStore.getState();

      if (!socketState?.connected) {
        throw "You are disconnected";
      }

      socketState.emit("room:start", { code, settings });
    },

    FnVote: (choice) => {
      const { socketState } = useSocketStore.getState();
      const { code } = useGameStore.getState();
      socketState.emit("round:vote", { code, choice });
    },
  }))
);

export default useGameStore;
