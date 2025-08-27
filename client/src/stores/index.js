import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useAllStore = create(
  immer((set) => ({
    displayName: "",
    roomName: "",
    roomCode: "",

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
  }))
);

export default useAllStore;
