import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";

import HomePage from "./views/HomePage";
import RootLayout from "./layouts/RootLayout";
import RoomPage from "./views/RoomPage";
import MainPage from "./views/MainLandingPage";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route element={<RootLayout />}>
          <Route path="/play" element={<HomePage />} />
          <Route path="/room" element={<RoomPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
