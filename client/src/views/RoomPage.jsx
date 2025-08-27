import InRound from "../components/room/inRound/InRound";
import Lobby from "../components/room/lobby/Lobby";
import Reveal from "../components/room/reveal/Reveal";
import Summary from "../components/room/summary/Summary";
import useGameStore from "../stores/gameStore";

const RoomPage = () => {
  const { roomName, code, gameState } = useGameStore();
  console.log(gameState);

  return (
    <div className="px-8 md:px-16 py-6 flex flex-col gap-12 justify-center items-center min-h-screen">
      {gameState === "idle" && <p>Room not found</p>} {/* No room */}
      {/* room = lobby */}
      {gameState === "lobby" && <Lobby code={code} roomName={roomName} />}
      {gameState === "in_round" && <InRound />} {/* Round starts*/}
      {gameState === "reveal" && <Reveal />} {/* Reveal round stats*/}
      {gameState === "summary" && <Summary />} {/* POST GAME*/}
    </div>
  );
};

export default RoomPage;
