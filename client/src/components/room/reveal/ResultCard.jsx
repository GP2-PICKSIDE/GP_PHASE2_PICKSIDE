import { useEffect, useState } from "react";
import { initials } from "../../../utils/initialsName";

import en from "../../../i18n/en.json";
import id from "../../../i18n/id.json";
import { LanguageContext } from "../../../contexts/context";
import { useContext } from "react";

const ResultCard = ({
  choose,
  label = "",
  percent = 0,
  count = 0,
  voters = [],
  players = [],
  isWinner = false,
}) => {
  const nameOf = (id) => players.find((x) => x.id === id)?.name || "?";
  const isA = choose === "A";
  const { lang } = useContext(LanguageContext);

  // theming
  const headBg = isA
    ? "from-indigo-500 to-blue-500"
    : "from-violet-500 to-fuchsia-500";
  const bodyGrad = isA
    ? "from-indigo-400/80 to-indigo-500/60"
    : "from-violet-400/80 to-fuchsia-500/60";

  // animate percentage
  const target = Math.max(0, Math.min(100, Number(percent) || 0));
  const [shownPct, setShownPct] = useState(0);
  const [barPct, setBarPct] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 700;
    const animate = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p; // easeInOutQuad
      setShownPct(Math.round(target * eased));
      setBarPct(target * eased);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <div
      className={[
        "relative w-full h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition",
        isWinner
          ? "ring-4 ring-emerald-400/70 shadow-emerald-300/30"
          : "ring-0",
      ].join(" ")}>
      {/* header */}
      <div className="px-10 pt-10 pb-6 flex flex-col items-center gap-4 relative z-[1]">
        <div className="relative">
          <span
            className={[
              "text-white w-12 h-12 rounded-full grid place-items-center text-2xl font-bold",
              "bg-gradient-to-br",
              headBg,
            ].join(" ")}>
            {choose}
          </span>
          <span className="absolute inset-0 rounded-full ring-4 ring-black/5" />
          {isWinner && (
            <span
              className="absolute -right-3 -top-3 text-xl"
              title="Winner"
              aria-label="Winner">
              🏆
            </span>
          )}
        </div>

        <p className="text-center font-semibold text-lg md:text-xl leading-snug">
          {label || "—"}
        </p>

        <div className="h-px w-full bg-black/5 mt-2" />
      </div>

      {/* body */}
      <div
        className={[
          "px-10 md:px-16 py-10 text-center flex-1 flex flex-col gap-6",
          "bg-gradient-to-b text-white relative z-[1]",
          bodyGrad,
        ].join(" ")}>
        <p className="text-5xl font-extrabold leading-none drop-shadow-sm">
          {shownPct}%
        </p>

        {/* progress */}
        <div className="w-full max-w-xl mx-auto">
          <div
            className="relative w-full h-5 rounded-full bg-white/30 shadow-[inset_0_1px_2px_rgba(0,0,0,.15)] overflow-hidden"
            role="img"
            aria-label={`Percentage bar showing ${target}% for option ${choose}`}
            title={`${target}%`}>
            <div
              className="h-full bg-white/80"
              style={{
                width: `${barPct}%`,
                transition: "width 220ms ease-out",
              }}
            />
          </div>
        </div>

        <p className="text-white/90 text-base md:text-lg">
          {count}{" "}
          {lang === "en"
            ? count === 1
              ? en.resultCard.votes
              : `${en.resultCard.votes}s`
            : id.resultCard.votes}
        </p>

        {/* voters */}
        {voters?.length ? (
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {voters.map((v) => {
              const nm = nameOf(v.id);
              return (
                <span
                  key={v.id}
                  className="inline-flex items-center justify-center rounded-full bg-white/25 text-white px-3 py-2 text-sm md:text-base font-medium"
                  title={nm}
                  aria-label={nm}>
                  {initials(nm)}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-white/80 text-sm">
            {lang === "en" ? en.resultCard.noVoters : id.resultCard.noVoters}
          </p>
        )}
      </div>

      {/* winner glow underlay */}
      {isWinner && (
        <div className="pointer-events-none absolute inset-x-10 bottom-6 h-24 rounded-full blur-2xl bg-emerald-400/40" />
      )}
    </div>
  );
};

export default ResultCard;
