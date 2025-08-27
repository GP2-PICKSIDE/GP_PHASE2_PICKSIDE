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

    gameState: "reveal",
    players: [],
    roundIndex: 0,
    totalRounds: 0,
    deadline: null,
    question: null,
    history: [],

    FnCreateRoom: () => {
      const { displayName: name, roomName } = useAllStore.getState();
      const { socketState } = useSocketStore.getState();

      if (name.length < 2) throw new Error("INVALID_NAME");
      console.log();

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
  }))
);

export default useGameStore;
