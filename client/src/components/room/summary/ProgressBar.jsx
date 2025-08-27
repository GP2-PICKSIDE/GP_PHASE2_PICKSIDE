const ProgressBar = ({
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

export default ProgressBar