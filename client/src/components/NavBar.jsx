import { useState } from "react";
import { Link } from "react-router";
import useSocketStore from "../stores/socketStore";

const NavBar = () => {
  const { isConnected } = useSocketStore();
  const [lang, setLang] = useState("en"); // static toggle

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "id" : "en"));
  };

  return (
    <nav className="flex justify-between px-8 md:px-16 py-6 items-center bg-white/50 backdrop-blur-lg border-b border-black/5">
      {/* Brand */}
      <Link
        to="/play"
        className="font-extrabold text-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text"
      >
        PICK<span className="text-gray-800">SIDE</span>
      </Link>

      <div className="flex items-center gap-4">
        {/* Simple white toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center justify-between w-16 px-1 py-1 rounded-full bg-white shadow ring-1 ring-black/5 text-sm font-semibold"
        >
          <span
            className={`w-1/2 text-center transition cursor-pointer ${
              lang === "en" ? "text-indigo-600" : "text-gray-500"
            }`}
          >
            EN
          </span>
          <span
            className={`w-1/2 text-center transition cursor-pointer ${
              lang === "id" ? "text-indigo-600" : "text-gray-500"
            }`}
          >
            ID
          </span>
        </button>

        {/* Connection status */}
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500 animate-pulse" : "bg-red-400"
            }`}
          />
          <p className="text-sm font-medium text-gray-700">
            {isConnected ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
