import useGameStore from "../../../stores/gameStore";

/** 1-bar comparison for A vs B */
const ProgressAB = ({
  aPct = 0,
  bPct = 0,
  aLabel = "Option A",
  bLabel = "Option B",
  aVotes = 0,
  bVotes = 0,
}) => {
  const safeA = Math.max(0, Math.min(100, Number(aPct) || 0));
  const safeB = Math.max(0, Math.min(100, Number(bPct) || 0));
  const showInsideLabel = (pct) => pct >= 14; // agar label tidak kepotong

  return (
    <div className="w-full">
      {/* Top labels */}
      <div className="flex justify-between text-sm font-medium mb-1">
        <span className="text-gray-700">{aLabel}</span>
        <span className="text-gray-700">{bLabel}</span>
      </div>

      {/* Split progress bar */}
      <div className="w-full h-5 rounded-full overflow-hidden flex bg-gray-100">
        <div
          className="h-full flex items-center justify-center bg-primary text-white text-xs"
          style={{ width: `${safeA}%` }}
        >
          {showInsideLabel(safeA) && <span className="px-2">{safeA}%</span>}
        </div>
        <div
          className="h-full flex items-center justify-center bg-secondary text-white text-xs"
          style={{ width: `${safeB}%` }}
        >
          {showInsideLabel(safeB) && <span className="px-2">{safeB}%</span>}
        </div>
      </div>

      {/* Bottom meta */}
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>
          {aVotes} vote{aVotes === 1 ? "" : "s"}
        </span>
        <span>
          {bVotes} vote{bVotes === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
};

const Summary = () => {
  const { players = [], history = [], settings = {} } = useGameStore();

  const totalPlayers = players.length;

  const totalA = history.reduce((acc, r) => acc + (r?.tally?.A || 0), 0);
  const totalB = history.reduce((acc, r) => acc + (r?.tally?.B || 0), 0);
  const totalVotes = totalA + totalB;
  const overallA = totalVotes ? Math.round((totalA / totalVotes) * 100) : 0;
  const overallB = totalVotes ? 100 - overallA : 0;

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

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold text-center">
        Game Summary
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32">
        {/* LEFT — Overall */}
        <div className="flex flex-col gap-4">
          <div className="w-full bg-white shadow-xl p-8 flex flex-col gap-4 rounded-xl">
            <p className="font-semibold text-2xl">Overall</p>

            {/* Overall single split bar */}
            <ProgressAB
              aPct={overallA}
              bPct={overallB}
              aLabel="Overall A"
              bLabel="Overall B"
              aVotes={totalA}
              bVotes={totalB}
            />

            <p className="font-semibold mt-4">
              Rounds played: {history.length} of{" "}
              {Number(settings?.rounds || history.length)}
            </p>

            <div>
              <p className="font-semibold">Top voted questions</p>
              {topList.length === 0 ? (
                <p className="text-gray-400">No data yet</p>
              ) : (
                topList.map((r, i) => {
                  const q = r?.question?.question || "—";
                  const va = r?.tally?.A || 0;
                  const vb = r?.tally?.B || 0;
                  return (
                    <p key={i} className="text-gray-600">
                      {q}{" "}
                      <span className="text-gray-400">({va + vb} votes)</span>
                    </p>
                  );
                })
              )}
            </div>

            <p className="font-semibold">
              Players participated: {totalPlayers}
            </p>
          </div>

          <button
            type="button"
            className="w-full bg-primary p-3 rounded-xl text-white cursor-pointer hover:bg-blue-700"
          >
            Play again
          </button>
          <button
            type="button"
            className="w-full border border-gray-400 p-3 rounded-xl cursor-pointer hover:bg-gray-200"
          >
            Back to Home
          </button>
        </div>

        {/* RIGHT — Rounds */}
        <div className="w-full bg-white shadow-xl p-8 flex flex-col gap-4 rounded-xl">
          <p className="font-semibold text-2xl">Rounds</p>

          <div className="flex flex-col gap-6">
            {history.map((round, i) => {
              const q = round?.question?.question || "—";
              const optA = round?.question?.options?.A || "Option A";
              const optB = round?.question?.options?.B || "Option B";
              const aVotes = round?.tally?.A || 0;
              const bVotes = round?.tally?.B || 0;
              const total = aVotes + bVotes;
              const aPct = total ? Math.round((aVotes / total) * 100) : 0;
              const bPct = total ? 100 - aPct : 0;

              return (
                <div key={i} className="flex gap-4">
                  <span className="w-6 shrink-0 text-gray-500">{i + 1}</span>
                  <div className="flex flex-col gap-2 w-full">
                    <span className="font-medium">{q}</span>
                    <ProgressAB
                      aPct={aPct}
                      bPct={bPct}
                      aLabel={optA}
                      bLabel={optB}
                      aVotes={aVotes}
                      bVotes={bVotes}
                    />
                  </div>
                </div>
              );
            })}

            {history.length === 0 && (
              <p className="text-gray-400">No rounds yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
