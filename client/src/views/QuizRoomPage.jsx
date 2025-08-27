import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useState, useEffect } from "react";

export default function QuizRoomPage() {
  const [theme, setTheme] = useState("funny");
  const [lang, setLang] = useState("id");
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(0);

  const generateQuestion = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/generateAi`, {
        theme,
        lang,
      });

      setQuestion(data.question);
      setOptions(data.options || []);
      setSelected(null);
      setTimer(10);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (opt) => {
    if (timer === 0) return;
    setSelected(opt);
  };

  // Timer countdown effect
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 gap-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center border border-purple-200">
          <h2 className="text-2xl font-extrabold mb-6 text-purple-700">
            Would You Rather...
          </h2>

          {loading ? (
            <p className="text-gray-500 animate-pulse">Loading question...</p>
          ) : question ? (
            <>
              <p className="text-lg mb-6 font-medium text-gray-800">
                {question}
              </p>

              <div className="flex flex-col gap-4">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(opt)}
                    disabled={!!selected || timer === 0}
                    className={`p-4 rounded-xl border-2 font-semibold text-lg transition-all duration-300 
                      ${
                        selected === opt
                          ? "bg-green-500 text-white border-green-600 scale-105"
                          : "bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
                      }
                      ${
                        timer === 0 && !selected
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}>
                    {opt}
                  </button>
                ))}
              </div>

              <p className="mt-6 text-gray-600 text-sm">
                Time left:{" "}
                <span className="font-bold text-red-500">{timer}s</span>
              </p>
            </>
          ) : (
            <p className="text-gray-500">Menunggu pertanyaan...</p>
          )}

          <button
            onClick={generateQuestion}
            className="mt-6 px-5 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 active:scale-95 transition">
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
}
