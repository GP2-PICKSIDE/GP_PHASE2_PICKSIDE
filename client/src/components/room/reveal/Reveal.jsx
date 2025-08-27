import { useEffect, useMemo, useState } from "react";
import ResultCard from "./ResultCard";
import useGameStore from "../../../stores/gameStore";

const Reveal = () => {
  const { reveal, players = [] } = useGameStore();
  const nextAt = reveal?.nextAt || 0;

  // countdown
  const [left, setLeft] = useState(0);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, nextAt - Date.now()));
    tick();
    const t = setInterval(tick, 200);
    return () => clearInterval(t);
  }, [nextAt]);
  const secs = Math.ceil(left / 1000);
  const progress = useMemo(() => {
    // tampilkan progress ke round berikut (reverse bar)
    const total = Math.max(1, nextAt - (reveal?.revealedAt || nextAt - 4000));
    return Math.min(1, Math.max(0, 1 - left / total));
  }, [left, nextAt, reveal?.revealedAt]);

  // tally
  const aVotes = reveal?.tally?.A || 0;
  const bVotes = reveal?.tally?.B || 0;
  const optA = reveal?.question?.options?.[0] || "Option A";
  const optB = reveal?.question?.options?.[1] || "Option B";
  const total = aVotes + bVotes;
  const aPct = total === 0 ? 0 : Math.round((aVotes / total) * 100);
  const bPct = total === 0 ? 0 : 100 - aPct;

  const allVoters = Array.isArray(reveal?.voters) ? reveal.voters : [];
  const votersA = allVoters.filter((v) => String(v.choice).toUpperCase() === "A");
  const votersB = allVoters.filter((v) => String(v.choice).toUpperCase() === "B");

  const isTie = aPct === bPct && total > 0;

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* header + next round bar */}
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-700">Results</h1>
        <p className="text-gray-500 mt-1">
          Next round starting… <b>{secs}</b>
        </p>
        <div className="mt-3 h-2 w-full rounded-full bg-black/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-indigo-500 transition-[width] duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        {isTie && <p className="mt-2 text-xs text-amber-600">It's a tie! 🎯</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32 items-stretch">
        <ResultCard
          choose="A"
          label={optA}
          percent={aPct}
          count={aVotes}
          voters={votersA}
          players={players}
          isWinner={!isTie && aPct > bPct}
        />
        <ResultCard
          choose="B"
          label={optB}
          percent={bPct}
          count={bVotes}
          voters={votersB}
          players={players}
          isWinner={!isTie && bPct > aPct}
        />
      </div>
    </div>
  );
};

export default Reveal;
