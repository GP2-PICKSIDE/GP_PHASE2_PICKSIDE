import { initials } from "../../../utils/initialsName";

const ResultCard = ({
  choose,
  percent = 0,
  count = 0,
  voters = [],
  players = [],
}) => {
  const nameOf = (id) => {
    const p = players.find((x) => x.id === id);
    return p?.name || "?";
  };

  const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
  const isA = choose === "A";
  const headBg = isA ? "bg-primary" : "bg-secondary";
  const bodyBg = isA ? "bg-primary/50" : "bg-secondary/50";

  return (
    <div className="w-full bg-white shadow-xl rounded-xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className={`${headBg} px-8 md:px-12 py-6 text-center`}>
        <h1 className="text-4xl text-white font-semibold tracking-wide">
          {choose}
        </h1>
      </div>

      {/* Body: flex-1 supaya tinggi selalu penuh (tidak menyisakan bg putih) */}
      <div
        className={`${bodyBg} px-8 md:px-12 py-10 text-center flex-1 flex flex-col`}
      >
        {/* Numbers */}
        <div className="flex flex-col items-center gap-8">
          <p className="text-white text-5xl font-extrabold leading-none">
            {safePercent}%
          </p>

          {/* Bar Chart / Progress */}
          <div className="w-full max-w-2xl mx-auto">
            <div
              className="relative w-full h-8 rounded-full bg-white/20 overflow-hidden"
              role="img"
              aria-label={`Percentage bar showing ${safePercent}% for option ${choose}`}
              title={`${safePercent}%`}
            >
              <div
                className={`h-full ${headBg} transition-[width] duration-700 ease-out`}
                style={{ width: `${safePercent}%` }}
              />
            </div>
          </div>

          <p className="text-white/90 text-lg">
            {count} {count === 1 ? "vote" : "votes"}
          </p>
        </div>

        {/* Spacer fleksibel supaya avatar selalu “di bawah” tapi body tetap penuh */}
        <div className="flex-1" />

        {/* Voters Avatars */}
        {voters?.length > 0 ? (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {voters.map((voter) => {
              const label = nameOf(voter.id);
              return (
                <span
                  key={voter.id}
                  className="inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur px-3 py-2 text-sm md:text-base text-white font-medium hover:bg-white/30 transition"
                  title={label}
                  aria-label={label}
                >
                  {initials(label)}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="mt-8 text-white/80 text-sm">No voters</p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
