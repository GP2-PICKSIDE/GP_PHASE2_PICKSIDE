import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import useSocketStore from "../stores/socketStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const RootLayout = () => {
  const { internalSocketConnect, internalSocketDisconnect } = useSocketStore();

  // socket connect
  const {
    mutate,
    isPending: isConnecting,
    isSuccess: isConnected,
  } = useMutation({
    mutationKey: ["connect"],
    mutationFn: internalSocketConnect,
  });

  useEffect(() => {
    mutate();

    return () => internalSocketDisconnect();
  }, [mutate, internalSocketDisconnect]);

  return (
    <>
      <NavBar isConnecting={isConnecting} isConnected={isConnected} />
      <Outlet />
    </>
  );
};

export default RootLayout;
