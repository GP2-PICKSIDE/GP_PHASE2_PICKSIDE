import { initials } from "../../../utils/initialsName";
import AnswerCard from "./AnswerCard";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { useState, useEffect } from "react";
import useGameStore from "../../../stores/gameStore";

const InRound = () => {
  const { players = [], settings } = useGameStore();

  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const generateQuestion = async () => {
      try {
        const { data } = await axios.post(`${BASE_URL}/generateAi`, {
          theme: settings?.theme,
          lang: settings?.lang,
        });

        setQuestion(data.question);
        setOptions(data.options || []);

        setTimer(10);
      } catch (err) {
        console.error(err);
      }
    };
    generateQuestion();
  }, [settings]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      <h1 className="text-xl md:text-3xl font-semibold text-center">
        Would you rather...
        <p className="mt-6 text-4xl font-bold">{question}</p>
      </h1>

      {/* Timer */}
      <p className="text-center text-red-500 text-2xl font-bold">
        {timer > 0 ? `Waktu tersisa: ${timer}s` : "Waktu habis!"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32 text-2xl">
        <AnswerCard choose="A" option={options[0]} />
        <AnswerCard choose="B" option={options[1]} />
      </div>

      {/* PlayerAvatar -> initials */}
      <div className="flex gap-4 flex-wrap">
        {players.map((player) => (
          <div
            key={player.id}
            className={`flex items-center justify-center rounded-full shrink-0
                      h-10 w-10 md:h-12 md:w-12 bg-secondary ring-1 ring-inset ring-secondary`}>
            <span className="font-semibold text-sm md:text-base select-none text-white">
              {initials(player.name || "")}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default InRound;
