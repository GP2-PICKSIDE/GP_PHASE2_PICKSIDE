import { useNavigate } from "react-router";
import useAllStore from "../../stores";
import useGameStore from "../../stores/gameStore";

import en from "../../i18n/en.json";
import id from "../../i18n/id.json";
import { LanguageContext } from "../../contexts/context";
import { useContext } from "react";

const JoinRoomCard = () => {
  const navigate = useNavigate();
  const { FnJoinRoom } = useGameStore();
  const { displayName, roomCode, setRoomCode, setDisplayName } = useAllStore();
  const { lang } = useContext(LanguageContext);

  const hanldeJoinRoom = async (e) => {
    try {
      e.preventDefault();

      await FnJoinRoom();

      navigate("/room");
    } catch (err) {
      console.error(err);
    }
  };

  const baseInput =
    "w-full rounded-lg pl-10 pr-3 py-3 border bg-white/70 backdrop-blur-md text-gray-900 " +
    "border-black/10 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition ";

  return (
    <section className="relative w-full rounded-2xl bg-white/50 backdrop-blur-xl border border-black/5 shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-pink-500" />
      <div className="px-8 md:px-10 py-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {" "}
          {lang === "en" ? en.joinRoom.title : id.joinRoom.title}
        </h2>

        <form onSubmit={hanldeJoinRoom} className="flex flex-col gap-4">
          {/* Display name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="displayName"
              className="text-sm text-gray-700 font-medium">
              {lang === "en"
                ? en.joinRoom.displayName
                : id.joinRoom.displayName}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
              </svg>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={
                  lang === "en"
                    ? en.joinRoom.placeholderName
                    : id.joinRoom.placeholderName
                }
                className={baseInput}
              />
            </div>
          </div>

          {/* Room code */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="roomCode"
              className="text-sm text-gray-700 font-medium">
              {lang === "en" ? en.joinRoom.roomCode : id.joinRoom.roomCode}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19Z"></path>
              </svg>
              <input
                id="roomCode"
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder={
                  lang === "en"
                    ? en.joinRoom.placeholderCode
                    : id.joinRoom.placeholderCode
                }
                className={baseInput}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition transform cursor-pointer bg-primary`}>
            {lang === "en" ? en.joinRoom.button : id.joinRoom.button}
          </button>
        </form>
      </div>
    </section>
  );
};

export default JoinRoomCard;
