import { Link } from "react-router";

const NavBar = ({ isConnecting, isConnected, isError }) => {
  return (
    <nav className="flex justify-between px-8 md:px-16 py-6 items-center">
      <Link to="/" className="font-semibold text-xl">
        PICKSIDE
      </Link>

      <div className="flex gap-2 items-center">
        <span
          className={`w-3 h-3 bg-success ${
            isConnecting
              ? "bg-gray-300"
              : isConnected
              ? "bg-success"
              : isError
              ? "bg-error"
              : "bg-error"
          } rounded-full`}
        ></span>
        <p>
          {isConnecting
            ? "Connecting..."
            : isConnected
            ? "Connected"
            : isError
            ? "Disconnected"
            : "Disconnected"}
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
