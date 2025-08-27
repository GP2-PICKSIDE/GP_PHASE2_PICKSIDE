import useAllStore from "../../../stores";
import useGameStore from "../../../stores/gameStore";
import { useMutation } from "@tanstack/react-query";

const HostSettingCard = () => {
  const { isHost, settings, FnStartRoom } = useGameStore();
  const { setRoomTheme, setRoomLang, setTotalRounds } = useAllStore();

  const themes = ["funny", "life", "food", "friends", "travel"];

  const { mutate } = useMutation({
    mutationKey: ["startRoom"],
    mutationFn: FnStartRoom,
  });

  const disabled = !isHost;

  const baseInput =
    "w-full rounded-lg p-3 border bg-white text-gray-900 " +
    "border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/30 " +
    (disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer");

  const labelCls = "text-sm text-gray-700";

  return (
    <section className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-black/5 shadow-md px-8 md:px-12 py-10 flex flex-col gap-6">
      <h2 className="text-xl font-semibold tracking-tight text-gray-900">
        Room Settings
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!disabled) mutate();
        }}
        className="flex flex-col gap-5"
      >
        {/* Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
          <label htmlFor="theme" className={labelCls}>
            Theme
          </label>
          <div className="sm:col-span-2">
            <select
              id="theme"
              className={baseInput}
              onChange={(e) => setRoomTheme(e.target.value)}
              value={settings?.theme}
              disabled={disabled}
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Language */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
          <label htmlFor="language" className={labelCls}>
            Language
          </label>
          <div className="sm:col-span-2">
            <select
              id="language"
              value={settings?.lang}
              onChange={(e) => setRoomLang(e.target.value)}
              className={baseInput}
              disabled={disabled}
            >
              <option value="en">English</option>
              <option value="id">Indonesia</option>
            </select>
          </div>
        </div>

        {/* Rounds */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
          <label htmlFor="totalRounds" className={labelCls}>
            Rounds
          </label>
          <div className="sm:col-span-2">
            <input
              type="number"
              id="totalRounds"
              value={settings?.rounds}
              onChange={(e) => setTotalRounds(e.target.value)}
              min={1}
              max={10}
              disabled={disabled}
              className={baseInput}
              placeholder="Rounds"
              inputMode="numeric"
            />
            <p className="mt-1 text-xs text-gray-500">Min 1 • Max 10</p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={disabled}
            className={`w-full rounded-lg px-4 py-3 font-semibold text-white transition cursor-pointer
              ${
                disabled
                  ? "bg-primary/60 cursor-not-allowed"
                  : "bg-primary hover:bg-blue-700"
              }`}
          >
            Start Game
          </button>
          <p className="text-center text-gray-500 text-xs mt-2">
            Settings are locked after the game starts.
          </p>
        </div>
      </form>
    </section>
  );
};

export default HostSettingCard;
