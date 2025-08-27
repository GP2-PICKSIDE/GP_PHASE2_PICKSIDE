import { initials } from "../../../utils/initialsName";
import AnswerCard from "./AnswerCard";
import useGameStore from "../../../stores/gameStore";
import { useEffect, useRef, useState } from "react";

const InRound = () => {
  const { players = [], question, roundIndex, deadline, me } = useGameStore();
  const list = players.filter((p) => p?.connected);
  const title = question?.question || "Loading...";
  const options = question?.options || [];

  // timer
  const [left, setLeft] = useState(0);
  const totalRef = useRef(1); // hindari div/0
  useEffect(() => {
    const tick = () => {
      const remain = Math.max(0, (deadline || 0) - Date.now());
      if (remain > totalRef.current) totalRef.current = remain; // set total awal
      setLeft(remain);
    };
    tick();
    const t = setInterval(tick, 200);
    return () => clearInterval(t);
  }, [deadline]);

  const secs = Math.ceil(left / 1000);
  const progress = Math.max(0, 1 - left / totalRef.current); // 0 -> 1

  // cek sudah vote (untuk disable tombol)
  const hasVoted = !!question?.votes?.[me?.id];

  // keyboard shortcut A/B
  useEffect(() => {
    if (hasVoted) return;
    const onKey = (e) => {
      const key = e.key.toLowerCase();
      if (key === "a" || key === "b") {
        const btn = document.querySelector(`[data-choose="${key.toUpperCase()}"]`);
        if (btn) btn.click();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasVoted]);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Title + round info */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl md:text-3xl font-semibold text-center">
          Would you rather...
          <p className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight">
            {title}
          </p>
        </h1>
        <div className="text-gray-500">
          Round {roundIndex + 1} • Time left: <b>{secs}s</b>
        </div>

        {/* progress bar */}
        <div className="w-full max-w-3xl h-2 rounded-full bg-black/5 overflow-hidden mt-1">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-[width] duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32 items-stretch">
        <div data-choose="A">
          <AnswerCard choose="A" option={options[0]} disabled={hasVoted} />
        </div>
        <div data-choose="B">
          <AnswerCard choose="B" option={options[1]} disabled={hasVoted} />
        </div>
      </div>

      {/* Player bubbles (voted = ring hijau) */}
      <div className="flex gap-4 flex-wrap mt-2">
        {list.map((player, idx) => {
          const voted = !!question?.votes?.[player.id];
          const rings = [
            "from-indigo-500 to-blue-500",
            "from-violet-500 to-fuchsia-500",
            "from-emerald-500 to-teal-500",
            "from-amber-500 to-orange-500",
            "from-sky-500 to-blue-500",
          ];
          return (
            <div
              key={player.id}
              className={[
                "relative flex items-center justify-center rounded-full shrink-0",
                "h-10 w-10 md:h-12 md:w-12 text-white",
                "bg-gradient-to-br", rings[idx % rings.length],
                voted ? "ring-4 ring-emerald-400" : "ring-2 ring-white/50",
              ].join(" ")}
              title={player.name || ""}
            >
              <span className="font-semibold text-sm md:text-base select-none">
                {initials(player.name || "")}
              </span>
              {voted && (
                <span className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InRound;
