import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useGameStore = create(
  immer((set) => ({
    gameState: "lobby",
  }))
);

export default useGameStore;
