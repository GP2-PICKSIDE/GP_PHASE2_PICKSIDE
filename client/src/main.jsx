import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import HomePage from "./views/HomePage";
import RootLayout from "./layouts/RootLayout";
import RoomPage from "./views/RoomPage";
import MainPage from "./views/MainLandingPage";

createRoot(document.getElementById("root")).render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route element={<RootLayout />}>
        <Route path="/play" element={<HomePage />} />
        <Route path="/room" element={<RoomPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
