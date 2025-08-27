import HostSettingCard from "./HostSettingCard";
import PlayersCard from "./PlayersCard";

const Lobby = ({ code, roomName }) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Room {roomName}
        </h1>

        {/* Code chip */}
        <button
          type="button"
          title="Copy room code"
          onClick={() => navigator.clipboard.writeText(code)}
          className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <span className="font-mono tracking-wide">{code}</span>
          <svg
            className="w-4 h-4 opacity-70"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3Zm-2 2v12h10V8H5Zm4-2h8v10h2V4H9v2Z"></path>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-stretch">
        <PlayersCard />
        <HostSettingCard />
      </div>
    </>
  );
};

export default Lobby;
