import useGameStore from "../../../stores/gameStore";
import { initials } from "../../../utils/initialsName";

const colorRing = [
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-sky-500 to-blue-500",
];

const PlayersCard = () => {
  const { players = [] } = useGameStore();
  const onlinePlayers = players.filter((p) => p?.connected);

  return (
    <section className="w-full rounded-2xl bg-white/60 backdrop-blur-xl border border-black/5 shadow-lg px-8 md:px-12 py-10 transition hover:shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
          Players in Room
        </h2>
        <span className="inline-flex items-center justify-center min-w-[2rem] h-7 px-2 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 ring-1 ring-inset ring-black/5">
          {onlinePlayers.length}
        </span>
      </div>

      {onlinePlayers.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No players yet — share the room code to invite friends.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-100">
          {onlinePlayers.map((player, idx) => {
            const name = player.name || "Unnamed Player";
            const ring = colorRing[idx % colorRing.length];

            return (
              <li key={player.id} className="py-4 flex items-center justify-between gap-4">
                {/* Left: Avatar + Name */}
                <div className="min-w-0 flex items-center gap-4">
                  <div
                    className={`relative h-12 w-12 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-white bg-gradient-to-br ${ring} text-white grid place-items-center`}
                    title={name}
                  >
                    <span className="font-semibold select-none">
                      {initials(name)}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium leading-tight truncate">{name}</p>
                    <p className="mt-1 text-xs md:hidden text-emerald-600">
                      Connected
                    </p>
                  </div>
                </div>

                {/* Desktop status */}
                <div className="hidden md:flex items-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-inset bg-emerald-50 text-emerald-700 ring-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Connected
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default PlayersCard;
