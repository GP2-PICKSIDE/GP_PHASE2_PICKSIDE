import { initials } from "../../../utils/initialsName";
import AnswerCard from "./AnswerCard";
import useGameStore from "../../../stores/gameStore";
import { useEffect } from "react";
import { useState } from "react";

const InRound = () => {
  const { players = [], question, roundIndex, deadline, me } = useGameStore();
  const title = question?.question || "Loading...";
  const options = question?.options || [];

  const [left, setLeft] = useState(0);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, (deadline || 0) - Date.now()));
    tick();
    const t = setInterval(tick, 250);
    return () => clearInterval(t);
  }, [deadline]);

  const secs = Math.ceil(left / 1000);
  // cek sudah vote (untuk disable tombol)
  const hasVoted = !!question?.votes?.[me?.id];

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl md:text-3xl font-semibold text-center">
          Would you rather...
          <p className="mt-6 text-4xl font-bold">{title}</p>
        </h1>
        <div className="text-gray-500">
          Round {roundIndex + 1} • Time left: <b>{secs}s</b>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32 text-2xl items-stretch">
        <AnswerCard choose="A" option={options[0]} disabled={hasVoted} />
        <AnswerCard choose="B" option={options[1]} disabled={hasVoted} />
      </div>

      {/* PlayerAvatar -> initials, border hijau -> sudah vote */}
      <div className="flex gap-4 flex-wrap">
        {players.map((player) => {
          const voted = !!question?.votes?.[player.id];
          return (
            <div
              key={player.id}
              className={`flex items-center justify-center rounded-full shrink-0
                h-10 w-10 md:h-12 md:w-12 bg-secondary ring-1 ring-inset ring-secondary
                ${voted ? "border-4 border-success" : ""}`}
            >
              <span className="font-semibold text-sm md:text-base select-none text-white">
                {initials(player.name || "")}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default InRound;
