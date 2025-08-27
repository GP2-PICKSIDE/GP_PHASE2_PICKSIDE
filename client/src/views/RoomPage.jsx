import InRound from "../components/room/inRound/InRound";
import Lobby from "../components/room/lobby/Lobby";
import Reveal from "../components/room/reveal/Reveal";
import Summary from "../components/room/summary/Summary";
import useGameStore from "../stores/gameStore";

const RoomPage = () => {
  const { roomName, code, gameState } = useGameStore();

  return (
    <div className="min-h-screen px-6 md:px-10 py-10 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {gameState === "idle" && (
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          Room not found
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
