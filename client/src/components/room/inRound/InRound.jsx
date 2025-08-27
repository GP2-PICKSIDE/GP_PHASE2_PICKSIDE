import { initials } from "../../../utils/initialsName";
import AnswerCard from "./AnswerCard";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { useState, useEffect } from "react";

const InRound = () => {
  const [theme] = useState("");
  const [lang] = useState("id");
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const generateQuestion = async () => {
      try {
        const { data } = await axios.post(`${BASE_URL}/generateAi`, {
          theme,
          lang,
        });

        setQuestion(data.question);
        setOptions(data.options || []);

        setTimer(10);
      } catch (err) {
        console.error(err);
      }
    };
    generateQuestion();
  }, [lang, theme]);

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
        {/* use case voted */}
        <div>
          <span className="bg-secondary rounded-full text-white p-4 border-4 border-green-500">
            {initials("tes halo")}
          </span>
        </div>
        <div>
          <span className="bg-secondary rounded-full text-white p-4">
            {initials("tes halo")}
          </span>
        </div>
      </div>
    </>
  );
};

export default InRound;
