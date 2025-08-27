import useGameStore from "../../../stores/gameStore";
import { initials } from "../../../utils/initialsName";

const PlayersCard = () => {
  const { players = [] } = useGameStore();

  return (
    <section className="w-full bg-white shadow-xl px-6 md:px-10 py-8 md:py-10 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-xl md:text-2xl">Players in Room</h2>
        <span className="text-sm text-gray-500">{players.length}</span>
      </div>

      {players.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No players yet — share the room code to invite friends.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-100">
          {players.map((player) => {
            const connected = player.connected;

            return (
              <li
                key={player.id}
                className="py-4 flex items-center justify-between gap-4"
              >
                {/* Left: Avatar + Name */}
                <div className="min-w-0 flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center rounded-full shrink-0
                      h-10 w-10 md:h-12 md:w-12 bg-secondary ring-1 ring-inset ring-secondary`}
                  >
                    <span className="font-semibold text-sm md:text-base select-none text-white">
                      {initials(player.name || "")}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium leading-tight truncate">
                      {player.name || "Unnamed Player"}
                    </p>

                    {/* Mobile: status under name */}
                    <p
                      className={`mt-1 text-xs flex items-center gap-1 md:hidden ${
                        connected ? "text-emerald-600" : "text-gray-500"
                      }`}
                    >
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          connected ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                      />
                      {connected ? "Connected" : "Disconnected"}
                    </p>
                  </div>
                </div>

                {/* Desktop: status pill */}
                <div className="hidden md:flex items-center">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-inset ${
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
