const NavBar = ({ isConnecting, isConnected }) => {
  return (
    <nav className="flex justify-between px-8 md:px-16 py-6 items-center">
      <div className="font-semibold text-xl">PICKSIDE</div>

      <div className="flex gap-2 items-center">
        <span
          className={`w-3 h-3 bg-success ${
            isConnecting
              ? "bg-gray-300"
              : isConnected
              ? "bg-success"
              : "bg-error"
          } rounded-full`}
        ></span>
        <p>
          {isConnecting
            ? "Connecting..."
            : isConnected
            ? "Connected"
            : "Disconnected"}
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
