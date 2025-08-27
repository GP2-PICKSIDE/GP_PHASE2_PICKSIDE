import { initials } from "../../../utils/initialsName";
import AnswerCard from "./AnswerCard";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { useState, useEffect } from "react";

const InRound = () => {
  const [theme, setTheme] = useState("");
  const [lang, setLang] = useState("id");
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);

  const generateQuestion = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/generateAi`, {
        theme,
        lang,
      });

      setQuestion(data.question);
      setOptions(data.options || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <>
      <h1 className="text-xl md:text-3xl font-semibold text-center">
        Would you rather...
        <p className="mt-6 text-4xl font-bold">{question}</p>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32">
        <AnswerCard choose="A" />
        <AnswerCard choose="B" />
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
