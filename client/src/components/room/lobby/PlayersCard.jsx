import useGameStore from "../../../stores/gameStore";
import { initials } from "../../../utils/initialsName";

const PlayersCard = () => {
  const { players = [] } = useGameStore();

  return (
    <section className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-black/5 shadow-md px-8 md:px-12 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
          Players in Room
        </h2>
        <span className="inline-flex items-center justify-center min-w-[2rem] h-7 px-2 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 ring-1 ring-inset ring-black/5">
          {players.length}
        </span>
      </div>

      {players.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No players yet — share the room code to invite friends.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-100">
          {players.map((player) => {
            const connected = player.connected;
            const name = player.name || "Unnamed Player";

            return (
              <li
                key={player.id}
                className="py-4 flex items-center justify-between gap-4"
              >
                {/* Left: Avatar + Name */}
                <div className="min-w-0 flex items-center gap-4">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 h-12 w-12 bg-secondary text-white ring-1 ring-inset ring-secondary/60"
                    title={name}
                  >
                    <span className="font-semibold text-base select-none">
                      {initials(name)}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium leading-tight truncate">{name}</p>
                    {/* Mobile status */}
                    <p
                      className={`mt-1 text-xs md:hidden ${
                        connected ? "text-emerald-600" : "text-gray-500"
                      }`}
                    >
                      {connected ? "Connected" : "Disconnected"}
                    </p>
                  </div>
                </div>

                {/* Desktop status pill */}
                <div className="hidden md:flex items-center">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-inset
                      ${
                        connected
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                          : "bg-gray-50 text-gray-600 ring-gray-200"
                      }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        connected ? "bg-emerald-500" : "bg-gray-400"
                      }`}
                    />
                    {connected ? "Connected" : "Disconnected"}
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
