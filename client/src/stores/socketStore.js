import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constant";
import useGameStore from "./gameStore";

const useSocketStore = create(
  immer((set, get) => ({
    socketState: undefined,
    error: undefined,

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
          deadline: room.deadline,
          question: room.question,
          isHost: room.hostId
            ? room.hostId === socketInitializer.id
            : state.isHost,
          me: { ...state.me, id: socketInitializer.id },
        }));
      }),
      
      socketInitializer.on("room:error", (err) => {
          useGameStore.setState((state) => ({
            ...state,
            error: err?.message || "ROOM_ERROR",
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
