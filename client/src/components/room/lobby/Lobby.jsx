import HostSettingCard from "./HostSettingCard";
import PlayersCard from "./PlayersCard";

import en from "../../../i18n/en.json";
import id from "../../../i18n/id.json";
import { LanguageContext } from "../../../contexts/context";
import { useContext } from "react";

const Lobby = ({ code, roomName }) => {
  const { lang } = useContext(LanguageContext);
  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            {lang === "en" ? en.lobby.title : id.lobby.title} {""}
            {roomName}
          </h1>
          <div className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500" />
        </div>

        {/* Code chip */}
        <div className="flex flex-col items-end">
          <button
            type="button"
            title="Copy room code"
            onClick={() => navigator.clipboard.writeText(code)}
            className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur-md px-4 py-2 text-sm text-gray-700 shadow-sm hover:shadow-md hover:bg-white transition">
            <span className="font-mono tracking-wide">{code}</span>
            <svg
              className="w-4 h-4 opacity-70"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3Zm-2 2v12h10V8H5Zm4-2h8v10h2V4H9v2Z"></path>
            </svg>
          </button>
          <p className="text-xs text-gray-500 mt-1">
            {lang === "en" ? en.lobby.shareNote : id.lobby.shareNote}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        <PlayersCard />
        <HostSettingCard />
      </div>
    </>
  );
};

export default Lobby;
