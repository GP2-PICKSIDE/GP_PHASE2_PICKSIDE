import useGameStore from "../../../stores/gameStore";
import useSocketStore from "../../../stores/socketStore";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router";

import en from "../../../i18n/en.json";
import id from "../../../i18n/id.json";
import { LanguageContext } from "../../../contexts/context";
import { useContext } from "react";

const Summary = () => {
  const { players = [], history = [], settings = {}, code } = useGameStore();
  const { socketState } = useSocketStore();
  const { lang } = useContext(LanguageContext);

  const totalPlayers = players.length;

  // Overall tallies
  const totalA = history.reduce((acc, r) => acc + (r?.tally?.A || 0), 0);
  const totalB = history.reduce((acc, r) => acc + (r?.tally?.B || 0), 0);
  const totalVotes = totalA + totalB;
  const overallA = totalVotes ? Math.round((totalA / totalVotes) * 100) : 0;
  const overallB = totalVotes ? 100 - overallA : 0;

  const leader =
    totalVotes === 0
      ? null
      : overallA === overallB
      ? "tie"
      : overallA > overallB
      ? "A"
      : "B";

  // Top rounds (by votes, tiebreaker = margin)
  const topList = [...history]
    .sort((x, y) => {
      const vx = (x?.tally?.A || 0) + (x?.tally?.B || 0);
      const vy = (y?.tally?.A || 0) + (y?.tally?.B || 0);
      if (vy !== vx) return vy - vx;
      const mx = Math.abs((x?.tally?.A || 0) - (x?.tally?.B || 0));
      const my = Math.abs((y?.tally?.A || 0) - (y?.tally?.B || 0));
      return my - mx;
    })
    .slice(0, 3);

  const handlePlayAgain = () => {
    if (!socketState || !code) return;
    socketState.emit("room:restart", { code });
  };

  // Normalize option label (array / object)
  const pickLabels = (q) => {
    const opt = q?.options;
    if (Array.isArray(opt))
      return { A: opt[0] ?? "Option A", B: opt[1] ?? "Option B" };
    return { A: opt?.A ?? "Option A", B: opt?.B ?? "Option B" };
  };

  return (
    <>
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800">
          {lang === "en" ? en.summary.title : id.summary.title}
        </h1>
        <p className="text-gray-500 mt-1">
          {history.length > 0
            ? `${
                lang === "en"
                  ? en.summary.roundsPlayed
                  : id.summary.roundsPlayed
              } ${history.length} ${
                lang === "en"
                  ? `${en.summary.round}${history.length === 1 ? "" : "s"}`
                  : id.summary.round
              }.`
            : lang === "en"
            ? en.summary.noRounds
            : id.summary.noRounds}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32 items-start">
        {/* LEFT — Overall */}
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl p-8 shadow-md bg-white/70 backdrop-blur-sm border border-black/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                {lang === "en" ? en.summary.overall : id.summary.overall}
              </h2>

              {leader && leader !== "tie" && (
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  {lang === "en" ? en.summary.leader : id.summary.leader}{" "}
                  {leader}
                </span>
              )}
              {leader === "tie" && (
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200">
                  {lang === "en" ? en.summary.tie : id.summary.tie}
                </span>
              )}
            </div>

            <ProgressBar
              variant="overall"
              aPct={overallA}
              bPct={overallB}
              aLabel={
                lang === "en"
                  ? en.summary.overallLeaderA
                  : id.summary.overallLeaderA
              }
              bLabel={
                lang === "en"
                  ? en.summary.overallLeaderB
                  : id.summary.overallLeaderB
              }
              aVotes={totalA}
              bVotes={totalB}
            />

            <div className="mt-4 space-y-1 text-gray-700">
              <p className="font-medium">
                {lang === "en" ? en.summary.roundsInfo : id.summary.roundsInfo}{" "}
                {history.length}{" "}
                {lang === "en" ? en.summary.roundSpace : id.summary.roundSpace}{" "}
                {Number(settings?.rounds || history.length)}
              </p>
              {totalVotes > 0 && (
                <p className="text-sm text-gray-600">
                  {overallA === overallB
                    ? lang === "en"
                      ? `${en.summary.overall} : ${en.summary.tie}`
                      : `${id.summary.overall} : ${id.summary.tie}`
                    : overallA > overallB
                    ? lang === "en"
                      ? `${en.summary.overallLeaderA} (+${
                          overallA - overallB
                        }%)`
                      : `${id.summary.overallLeaderA} (+${
                          overallA - overallB
                        }%)`
                    : lang === "en"
                    ? `${en.summary.overallLeaderA} (+${overallB - overallA}%)`
                    : `${id.summary.overallLeaderA} (+${
                        overallB - overallA
                      }%)`}{" "}
                </p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">
                {lang === "en" ? en.summary.topVoted : id.summary.topVoted}
              </h3>
              {topList.length === 0 ? (
                <p className="text-gray-500 text-sm mt-1">No data yet</p>
              ) : (
                <ul className="list-disc ml-5 text-gray-800 space-y-1 mt-1">
                  {topList.map((r, i) => (
                    <li key={i}>{r?.question?.question}</li>
                  ))}
                </ul>
              )}
            </div>

            <p className="mt-6 text-sm font-medium text-gray-800">
              {lang === "en"
                ? en.summary.playersParticipated
                : id.summary.playersParticipated}{" "}
              {totalPlayers}
            </p>
          </section>

          {/* CTAs */}
          <button
            onClick={handlePlayAgain}
            className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-xl text-white font-semibold cursor-pointer transition">
            {lang === "en" ? en.summary.playAgain : id.summary.playAgain}
          </button>
          <Link
            to="/play"
            className="w-full border border-gray-300 p-3 rounded-xl cursor-pointer hover:bg-gray-100 text-center">
            {lang === "en" ? en.summary.backHome : id.summary.backHome}
          </Link>
        </div>

        {/* RIGHT — Per round list */}
        <section className="flex flex-col gap-4">
          {history.length === 0 ? (
            <div className="rounded-xl p-6 shadow-sm border border-black/5 bg-white text-gray-500">
              {lang === "en"
                ? en.summary.noRoundsToShow
                : id.summary.noRoundsToShow}
            </div>
          ) : (
            history.map((round, i) => {
              const { A: optA, B: optB } = pickLabels(round?.question);
              const aVotes = round?.tally?.A || 0;
              const bVotes = round?.tally?.B || 0;
              const t = aVotes + bVotes;
              const aPct = t ? Math.round((aVotes / t) * 100) : 0;
              const bPct = t ? 100 - aPct : 0;
              const winner = aPct === bPct ? "tie" : aPct > bPct ? "A" : "B";

              return (
                <article
                  key={i}
                  className="rounded-xl p-6 shadow-sm border border-black/5 bg-white">
                  <h3 className="font-semibold text-gray-900">
                    {i + 1}. {round?.question?.question}
                  </h3>

                  <div className="mt-3">
                    <ProgressBar
                      variant={
                        winner === "A"
                          ? "roundA"
                          : winner === "B"
                          ? "roundB"
                          : "overall"
                      }
                      aPct={aPct}
                      bPct={bPct}
                      aLabel={`A. ${optA}`}
                      bLabel={`B. ${optB}`}
                      aVotes={aVotes}
                      bVotes={bVotes}
                    />
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>
    </>
  );
};

export default Summary;
