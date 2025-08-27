import { useEffect, useState } from "react";
import { initials } from "../../../utils/initialsName";

const ResultCard = ({
  choose,
  label = "",
  percent = 0,
  count = 0,
  voters = [],
  players = [],
  isWinner = false, // <— tambahkan prop ini dari Reveal.jsx
}) => {
  const nameOf = (id) => players.find((x) => x.id === id)?.name || "?";
  const isA = choose === "A";
  const headBg = isA ? "bg-primary" : "bg-secondary";
  const bodyGrad = isA
    ? "from-primary/75 to-primary/55"
    : "from-secondary/75 to-secondary/55";

  // animate %
  const target = Math.max(0, Math.min(100, Number(percent) || 0));
  const [shownPct, setShownPct] = useState(0);
  const [barPct, setBarPct] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 650;
    const animate = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setShownPct(Math.round(target * p));
      setBarPct(target * p);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <div
      className={[
        "w-full bg-white rounded-2xl overflow-hidden h-full flex flex-col transition-transform",
        "shadow-xl",
        isWinner
          ? "ring-4 ring-emerald-400/70 shadow-emerald-300/40"
          : "ring-0",
      ].join(" ")}
    >
      {/* Header */}
      <div className="px-10 pt-10 pb-6 flex flex-col items-center gap-4">
        <div className="relative">
          <span
            className={`${headBg} text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-semibold`}
          >
            {choose}
          </span>
          <span className="absolute inset-0 rounded-full ring-4 ring-black/5" />
          {isWinner && (
            <span
              className="absolute -right-3 -top-3 text-xl"
              title="Winner"
              aria-label="Winner"
            >
              🏆
            </span>
          )}
        </div>

        <p className="text-center font-semibold text-lg md:text-xl leading-snug">
          {label || "—"}
        </p>

        <div className="h-px w-full bg-black/5 mt-2" />
      </div>

      {/* Body */}
      <div
        className={`px-10 md:px-16 py-10 text-center flex-1 flex flex-col gap-6 bg-gradient-to-b ${bodyGrad}`}
      >
        {/* Percent */}
        <p className="text-white text-5xl font-extrabold leading-none drop-shadow-sm">
          {shownPct}%
        </p>

        {/* Progress */}
        <div className="w-full max-w-xl mx-auto">
          <div
            className="relative w-full h-5 rounded-full bg-white/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)] overflow-hidden"
            role="img"
            aria-label={`Percentage bar showing ${target}% for option ${choose}`}
            title={`${target}%`}
          >
            <div
              className={`h-full ${headBg}`}
              style={{
                width: `${barPct}%`,
                transition: "width 200ms ease-out",
              }}
            />
          </div>
        </div>

        {/* Votes */}
        <p className="text-white/90 text-base md:text-lg">
          {count} {count === 1 ? "vote" : "votes"}
        </p>

        {/* Avatars */}
        {voters?.length ? (
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {voters.map((v) => {
              const nm = nameOf(v.id);
              return (
                <span
                  key={v.id}
                  className="inline-flex items-center justify-center rounded-full bg-white/25 text-white px-3 py-2 text-sm md:text-base font-medium"
                  title={nm}
                  aria-label={nm}
                >
                  {initials(nm)}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-white/80 text-sm">No voters</p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
