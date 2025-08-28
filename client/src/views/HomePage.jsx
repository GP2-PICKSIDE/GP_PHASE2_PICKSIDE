import CreateRoomcard from "../components/home/CreateRoomCard";
import JoinRoomCard from "../components/home/JoinRoomCard";

import en from "../i18n/en.json";
import id from "../i18n/id.json";
import { LanguageContext } from "../contexts/context";
import { useContext } from "react";

const HomePage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="min-h-screen px-6 md:px-10 py-12 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800">
          {lang === "en" ? en.home.title : id.home.title}
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          {lang === "en" ? en.home.subtitle : id.home.subtitle}
        </p>
      </header>

      <main className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        <CreateRoomcard />
        <JoinRoomCard />
      </main>
    </div>
  );
};

export default HomePage;
