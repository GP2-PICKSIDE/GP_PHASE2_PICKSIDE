import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";

import HomePage from "./views/HomePage";
import RootLayout from "./layouts/RootLayout";
import RoomPage from "./views/RoomPage";
import QuizRoom from "./components/quiz/QuizRoom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/room" element={<RoomPage />} />
            <Route path="/quiz-room" element={<QuizRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
