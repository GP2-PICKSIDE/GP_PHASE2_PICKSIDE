import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constant";
import useGameStore from "./gameStore";

const useSocketStore = create(
  immer((set, get) => ({
    socketState: undefined,

    internalSocketConnect: () => {
      const socketInitializer = io(BASE_URL);

      socketInitializer.on("connect", () => {
        console.log(socketInitializer.id);
      });

      socketInitializer.on("room:state", (room) => {
        useGameStore.setState((state) => ({
          code: room.code,
          gameState: room.gameState,
          roomName: room.roomName,
          players: room.players,
          settings: room.settings,
          roundIndex: room.roundIndex,
          totalRounds: room.totalRounds,
          deadline: room.deadline,
          question: room.question,
          isHost: room.hostId
            ? room.hostId === socketInitializer.id
            : state.isHost,
          me: { ...state.me, id: socketInitializer.id },
        }));
      }),
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
