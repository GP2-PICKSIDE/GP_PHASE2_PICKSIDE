import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constant";

const useSocketStore = create(
  immer((set, get) => ({
    socketState: undefined,

    internalSocketConnect: () => {
      const socketInitializer = io(BASE_URL);

      socketInitializer.on("connect", () => {
        console.log(socketInitializer.id);
      });

      set((state) => {
        state.socketState = socketInitializer;
      });
    },

    internalSocketDisconnect: () => {
      const currentSocket = get().socketState;

      if (currentSocket) currentSocket.disconnect();
    },
  }))
);

export default useSocketStore;
