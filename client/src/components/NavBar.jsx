import { Link } from "react-router";
import useSocketStore from "../stores/socketStore";

const NavBar = () => {
  const { isConnected } = useSocketStore();

  return (
    <nav className="flex justify-between px-8 md:px-16 py-6 items-center">
      <Link to="/play" className="font-semibold text-xl">
        PICKSIDE
      </Link>

      <div className="flex gap-2 items-center">
        <span
          className={`w-3 h-3 ${
            !isConnected
              ? "bg-error"
              : isConnected
              ? "bg-success"
              : "bg-gray-300"
          } rounded-full`}
        ></span>
        <p>
          {!isConnected
            ? "Disconnected"
            : isConnected
            ? "Connected"
            : "Disconnected"}
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
