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

  return (
    <div className="w-full bg-white shadow-xl px-8 md:px-16 py-12 flex flex-col gap-8 rounded-xl">
      <p className="font-semibold text-2xl">Room Settings</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex justify-between gap-4 w-full items-center">
          <label className="w-full" htmlFor="theme">
            Theme
          </label>
          <select
            id="theme"
            className={`w-full rounded-lg p-3 border border-gray-400 ${
              !isHost ? "bg-gray-300/50" : ""
            }`}
            onChange={(e) => setRoomTheme(e.target.value)}
            value={settings?.theme}
            disabled={!isHost ? true : false}
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between gap-4 w-full items-center">
          <label className="w-full" htmlFor="language">
            Language
          </label>
          <select
            id="language"
            disabled={!isHost ? true : false}
            value={settings?.lang}
            onChange={(e) => setRoomLang(e.target.value)}
            className={`w-full rounded-lg p-3 border border-gray-400 ${
              !isHost ? "bg-gray-300/50" : ""
            }`}
          >
            <option value="en">English</option>
            <option value="id">Indonesia</option>
          </select>
        </div>

        <div className="flex gap-4 items-center">
          <label className="w-full" htmlFor="totalRounds">
            Rounds
          </label>
          <input
            type="number"
            id="totalRounds"
            value={settings?.rounds}
            onChange={(e) => setTotalRounds(e.target.value)}
            min={1}
            max={10}
            disabled={!isHost ? true : false}
            className={`w-full rounded-lg p-3 border border-gray-400 ${
              !isHost ? "bg-gray-300/50" : ""
            }`}
            placeholder="Rounds"
          />
        </div>

        <button
          type="submit"
          disabled={!isHost ? true : false}
          className={` text-white rounded-lg p-3   ${
            !isHost
              ? "bg-primary/50 cursor-not-allowed"
              : "hover:bg-blue-700 bg-primary cursor-pointer"
          }`}
        >
          Start Game
        </button>
        <p className="text-center text-gray-400 text-sm">
          Setting will be frozen after start.
        </p>
      </form>
    </div>
  );
};

export default HostSettingCard;
