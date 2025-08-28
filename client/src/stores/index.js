import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import useGameStore from "./gameStore";
import useSocketStore from "./socketStore";

const useAllStore = create(
  immer((set) => ({
    displayName: "",
    roomName: "",
    roomCode: "",
    globalLang: "id",

    setDisplayName: (value) => {
      set((state) => {
        state.displayName = value;
      });
    },

    setRoomName: (value) => {
      set((state) => {
        state.roomName = value;
      });
    },

    setRoomCode: (value) => {
      set((state) => {
        state.roomCode = value;
      });
    },

    setRoomTheme: (value) => {
      const { socketState } = useSocketStore.getState();
      const { code, settings } = useGameStore.getState();

      const next = { ...settings, theme: value };
      useGameStore.setState({ settings: next });

      socketState.emit("room:settings", { code, ...next });
    },

    setRoomLang: (value) => {
      const { socketState } = useSocketStore.getState();
      const { code, settings } = useGameStore.getState();

      const next = { ...settings, lang: value };
      useGameStore.setState({ settings: next });

      socketState.emit("room:settings", { code, ...next });
    },

    setTotalRounds: (value) => {
      const { socketState } = useSocketStore.getState();
      const { code, settings } = useGameStore.getState();

      const roundsNum = Number(value) || 1;
      const next = { ...settings, rounds: roundsNum };
      useGameStore.setState({ settings: next });

      socketState.emit("room:settings", { code, ...next });
    },

    setGlobalLang: (value) => {
      set((state) => {
        state.globalLang = value;
      });
    },
  }))
);

export default useAllStore;
