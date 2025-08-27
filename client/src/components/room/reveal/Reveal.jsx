import { useEffect, useState } from "react";
import ResultCard from "./ResultCard";
import useGameStore from "../../../stores/gameStore";

const Reveal = () => {
  const { reveal, players = [] } = useGameStore();
  const nextAt = reveal?.nextAt || 0;

  const [left, setLeft] = useState(0);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, nextAt - Date.now()));
    tick();
    const t = setInterval(tick, 250);
    return () => clearInterval(t);
  }, [nextAt]);
  const secs = Math.ceil(left / 1000);

  // tally
  const aVotes = reveal?.tally?.A || 0;
  const bVotes = reveal?.tally?.B || 0;

  const total = aVotes + bVotes;
  const aPct = total === 0 ? 0 : Math.round((aVotes / total) * 100);
  const bPct = total === 0 ? 0 : 100 - aPct;

  const allVoters = Array.isArray(reveal?.voters) ? reveal.voters : [];
  const votersA = allVoters.filter(
    (v) => String(v.choice).toUpperCase() === "A"
  );
  const votersB = allVoters.filter(
    (v) => String(v.choice).toUpperCase() === "B"
  );

  return (
    <>
      <div className="flex flex-col gap-2 text-gray-400">
        <h1 className="text-2xl md:text-4xl font-semibold text-center">
          Results
        </h1>
        <p>Next round starting... {secs}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32 items-stretch">
        <ResultCard
          choose="A"
          percent={aPct}
          count={aVotes}
          voters={votersA}
          players={players}
        />
        <ResultCard
          choose="B"
          percent={bPct}
          count={bVotes}
          voters={votersB}
          players={players}
        />
      </div>
    </>
  );
};
export default Reveal;
