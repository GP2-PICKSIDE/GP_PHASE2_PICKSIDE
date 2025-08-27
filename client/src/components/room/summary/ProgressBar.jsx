const ProgressBar = ({
  aPct = 0,
  bPct = 0,
  aLabel = "Option A",
  bLabel = "Option B",
  aVotes = 0,
  bVotes = 0,
  variant = "overall",
}) => {
  const clamp = (n) => Math.max(0, Math.min(100, Number(n) || 0));
  const A = clamp(aPct);
  const B = clamp(bPct);

  const TopLabels = () => (
    <div className="flex justify-between text-sm font-medium mb-1">
      <span className="text-gray-800 truncate max-w-[48%]" title={aLabel}>
        {aLabel}
      </span>
      <span className="text-gray-800 truncate max-w-[48%] text-right" title={bLabel}>
        {bLabel}
      </span>
    </div>
  );

  const PercentOutside = ({ value, side }) => (
    <span
      className={`absolute -top-6 text-xs font-semibold text-gray-700 ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      {value}%
    </span>
  );

  return (
    <div className="w-full">
      <TopLabels />

      {/* Track */}
      <div
        className="relative w-full h-5 rounded-full overflow-hidden flex bg-gray-200"
        role="img"
        aria-label={`${aLabel} ${A}%, ${bLabel} ${B}%`}
        title={`${aLabel} ${A}%, ${bLabel} ${B}%`}
      >
        {variant === "overall" ? (
          <>
            <div
              className="h-full flex items-center justify-center text-white text-xs transition-[width] duration-500 ease-out bg-gradient-to-r from-indigo-600 to-indigo-500"
              style={{ width: `${A}%` }}
            >
              {A >= 14 && <span className="px-2">{A}%</span>}
            </div>
            <div
              className="h-full flex items-center justify-center text-white text-xs transition-[width] duration-500 ease-out bg-gradient-to-r from-violet-600 to-fuchsia-500"
              style={{ width: `${B}%` }}
            >
              {B >= 14 && <span className="px-2">{B}%</span>}
            </div>

            {/* fallback label if too small */}
            {A < 14 && A > 0 && <PercentOutside value={A} side="left" />}
            {B < 14 && B > 0 && <PercentOutside value={B} side="right" />}
          </>
        ) : (
          <>
            <div
              className={`h-full transition-[width] duration-500 ease-out ${
                variant === "roundA"
                  ? "bg-indigo-600"
                  : "bg-violet-600"
              }`}
              style={{ width: `${variant === "roundA" ? A : B}%` }}
            />
            {(variant === "roundA" ? A : B) < 14 &&
              (variant === "roundA" ? A : B) > 0 && (
                <PercentOutside
                  value={variant === "roundA" ? A : B}
                  side={variant === "roundA" ? "left" : "right"}
                />
              )}
            {(variant === "roundA" ? A : B) >= 14 && (
              <span className="absolute inset-0 grid place-items-center text-[11px] font-semibold text-white">
                {variant === "roundA" ? `${A}%` : `${B}%`}
              </span>
            )}
          </>
        )}
      </div>

      <div className="flex justify-between text-xs text-gray-600 mt-1">
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

export default ProgressBar;
