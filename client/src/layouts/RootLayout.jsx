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
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
