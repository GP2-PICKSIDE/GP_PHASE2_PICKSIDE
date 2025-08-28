import InRound from "../components/room/inRound/InRound";
import Lobby from "../components/room/lobby/Lobby";
import Reveal from "../components/room/reveal/Reveal";
import Summary from "../components/room/summary/Summary";
import useGameStore from "../stores/gameStore";

import en from "../i18n/en.json";
import id from "../i18n/id.json";
import { LanguageContext } from "../contexts/context";
import { useContext } from "react";

const RoomPage = () => {
  const { roomName, code, gameState } = useGameStore();
  const { lang } = useContext(LanguageContext);

  return (
    <div className="min-h-screen px-6 md:px-10 py-10 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {gameState === "idle" && (
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          {lang === "en" ? en.room.notFound : id.room.notFound}
        </div>
      )}

      {gameState === "lobby" && (
        <div className="max-w-6xl mx-auto">
          <Lobby code={code} roomName={roomName} />
        </div>
      )}

      {gameState === "in_round" && <InRound />}
      {gameState === "reveal" && <Reveal />}
      {gameState === "summary" && <Summary />}
    </div>
  );
};

export default RoomPage;
