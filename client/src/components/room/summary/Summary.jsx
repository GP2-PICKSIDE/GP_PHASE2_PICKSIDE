import useGameStore from "../../../stores/gameStore";
import useSocketStore from "../../../stores/socketStore";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router";

const Summary = () => {
  const { players = [], history = [], settings = {}, code } = useGameStore();
  const { socketState } = useSocketStore();

  const totalPlayers = players.length;

  // Overall tallies
  const totalA = history.reduce((acc, r) => acc + (r?.tally?.A || 0), 0);
  const totalB = history.reduce((acc, r) => acc + (r?.tally?.B || 0), 0);
  const totalVotes = totalA + totalB;
  const overallA = totalVotes ? Math.round((totalA / totalVotes) * 100) : 0;
  const overallB = totalVotes ? 100 - overallA : 0;

  // Top rounds
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
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        Game Summary
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32 items-stretch">
        {/* LEFT — Overall */}
        <div className="flex flex-col gap-6">
          <section className="w-full rounded-2xl h-full p-8 shadow-md bg-white/70 backdrop-blur-sm border border-black/5">
            <header className="mb-4">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                Overall
              </h2>
            </header>

            <ProgressBar
              variant="overall"
              aPct={overallA}
              bPct={overallB}
              aLabel="Overall A"
              bLabel="Overall B"
              aVotes={totalA}
              bVotes={totalB}
            />

            <div className="mt-4 space-y-1 text-gray-700">
              <p className="font-medium">
                Rounds played: {history.length} of{" "}
                {Number(settings?.rounds || history.length)}
              </p>
              {totalVotes > 0 && (
                <p className="text-sm text-gray-600">
                  {overallA === overallB
                    ? "Overall result: tie."
                    : overallA > overallB
                    ? `Overall leader: A (+${overallA - overallB}%)`
                    : `Overall leader: B (+${overallB - overallA}%)`}
                </p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Top voted questions
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
              Players participated: {totalPlayers}
            </p>
          </section>

          <button
            onClick={handlePlayAgain}
            className="w-full bg-primary p-3 rounded-xl text-white font-semibold cursor-pointer hover:bg-blue-700 transition"
          >
            Play again
          </button>
          <Link
            to="/play"
            className="w-full border border-gray-300 p-3 rounded-xl cursor-pointer hover:bg-gray-100 text-center"
          >
            Back to Home
          </Link>
        </div>

        {/* RIGHT — Rounds */}
        <section className="flex flex-col gap-4">
          {history.map((round, i) => {
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
                className="rounded-xl p-6 shadow-sm border border-black/5 bg-white"
              >
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
          })}
        </section>
      </div>
    </>
  );
};

export default Summary;
