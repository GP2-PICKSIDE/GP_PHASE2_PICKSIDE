const HostSettingCard = () => {
  return (
    <div className="w-full bg-white shadow-xl px-8 md:px-16 py-12 flex flex-col gap-8 rounded-xl">
      <p className="font-semibold text-2xl">Room Settings</p>

      <form className="flex flex-col gap-4">
        <div className="flex justify-between gap-4 w-full items-center">
          <label className="w-full" htmlFor="theme">
            Theme
          </label>
          <select
            id="theme"
            className="w-full rounded-lg p-3 border border-gray-400"
          ></select>
        </div>

        <div className="flex justify-between gap-4 w-full items-center">
          <label className="w-full" htmlFor="language">
            Language
          </label>
          <select
            id="language"
            className="w-full rounded-lg p-3 border border-gray-400"
          ></select>
        </div>

        <div className="flex gap-4 items-center">
          <label className="w-full" htmlFor="roomName">
            Rounds
          </label>
          <input
            type="number"
            id="roomName"
            className="w-full rounded-lg p-3 border border-gray-400"
            placeholder="5"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white rounded-lg p-3 cursor-pointer hover:bg-blue-700"
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
