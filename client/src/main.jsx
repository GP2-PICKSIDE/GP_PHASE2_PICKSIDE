import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import HomePage from "./views/HomePage";
import RootLayout from "./layouts/RootLayout";
import RoomPage from "./views/RoomPage";
import MainPage from "./views/MainLandingPage";
import { LanguageProvider } from "./contexts/context";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer />
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<RootLayout />}>
          <Route path="/play" element={<HomePage />} />
          <Route path="/room" element={<RoomPage />} />
        </Route>
      </Routes>
    </LanguageProvider>
  </BrowserRouter>
);
