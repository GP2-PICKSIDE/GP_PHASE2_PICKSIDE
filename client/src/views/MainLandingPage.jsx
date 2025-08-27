import { Link } from "react-router";
import { useEffect, useRef } from "react";
import pickside from "../assets/pickside.png";
const MainPage = () => {
  const textRef = useRef();

  useEffect(() => {
    textRef.current.classList.add("animate-fadeInUp");
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease;
          }
        `}
      </style>
      <div className="bg-gradient-to-br from-gray to-blue-500 flex min-h-screen items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div
            ref={textRef}
            className="flex flex-col items-center gap-5 text-center">
            <img src={pickside} alt="logo" />
            <span className="text-4xl font-semibold font-stretch-50% text-black drop-shadow">
              ready to pick your side?
            </span>
            <span className="text-xl text-black">
              click the button below to start the game
            </span>
          </div>
          <Link
            to="/play"
            className="bg-amber-200 rounded-lg px-8 py-3 text-lg font-semibold shadow hover:bg-amber-300 transition"
          >
            Start
          </Link>
        </div>
      </div>
    </>
  );
};
export default MainPage;
