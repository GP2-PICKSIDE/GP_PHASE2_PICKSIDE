import { Link } from "react-router";

import en from "../i18n/en.json";
import id from "../i18n/id.json";
import { LanguageContext } from "../contexts/context";
import { useContext } from "react";

const MainPage = () => {
  const { lang } = useContext(LanguageContext);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-pink-50 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center px-6 animate-fade-up">
        {/* Logo */}
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
          PICK<span className="text-gray-800">SIDE</span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl font-semibold text-gray-800">
          {lang === "en" ? en.main.subtitle : id.main.subtitle}
        </p>
        <p className="text-gray-500 max-w-lg">
          {lang === "en" ? en.main.description : id.main.description}
        </p>

        {/* CTA */}
        <Link
          to="/play"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl font-semibold shadow-lg transition transform hover:scale-[1.03]">
          {lang === "en" ? en.main.startButton : id.main.startButton}
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
