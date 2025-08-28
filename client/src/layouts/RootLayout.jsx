import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import useSocketStore from "../stores/socketStore";
import { useEffect } from "react";

const RootLayout = () => {
  const { internalSocketConnect, internalSocketDisconnect } = useSocketStore();

  useEffect(() => {
    internalSocketConnect();
    return () => internalSocketDisconnect();
  }, [internalSocketConnect, internalSocketDisconnect]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
