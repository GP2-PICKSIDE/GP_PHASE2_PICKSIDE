import { Link } from "react-router";
import useSocketStore from "../stores/socketStore";

const NavBar = () => {
  const { isConnected } = useSocketStore();

  return (
    <nav className="flex justify-between px-8 md:px-16 py-6 items-center bg-white/50 backdrop-blur-lg border-b border-black/5">
      <Link
        to="/play"
        className="font-extrabold text-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
        PICK<span className="text-gray-800">SIDE</span>
      </Link>

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
    </nav>
  );
};

export default NavBar;
