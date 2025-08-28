import useGameStore from "../../../stores/gameStore";

import en from "../../../i18n/en.json";
import id from "../../../i18n/id.json";
import { LanguageContext } from "../../../contexts/context";
import { useContext } from "react";

const AnswerCard = ({ choose, option, disabled }) => {
  const { FnVote } = useGameStore();
  const { lang } = useContext(LanguageContext);

  const isA = choose === "A";
  const headBg = isA
    ? "from-indigo-500 to-blue-500"
    : "from-violet-500 to-fuchsia-500";
  const bodyGrad = isA
    ? "from-indigo-50/60 to-indigo-100/40"
    : "from-violet-50/60 to-fuchsia-100/40";
  const btnGrad = isA
    ? "from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
    : "from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700";

  const isLoading = !option || option === "Loading...";

  return (
    <div
      className={[
        "w-full h-full flex flex-col rounded-2xl overflow-hidden",
        "bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl",
        "transition-transform duration-200 hover:-translate-y-0.5",
        disabled ? "opacity-90" : "",
      ].join(" ")}>
      {/* Header */}
      <div className="px-8 pt-8 pb-4 flex flex-col items-center gap-4">
        <span className="relative">
          <span
            className={[
              "rounded-full w-14 h-14 text-2xl text-white",
              "grid place-items-center font-bold",
              "bg-gradient-to-br",
              headBg,
            ].join(" ")}>
            {choose}
          </span>
          <span className="absolute inset-0 rounded-full ring-4 ring-black/5 pointer-events-none" />
        </span>

        {isLoading ? (
          <div className="w-56 h-6 rounded-md bg-black/10 animate-pulse" />
        ) : (
          <p className="text-center font-semibold text-lg md:text-xl leading-snug">
            {option}
          </p>
        )}
      </div>

      <div className="h-px w-full bg-black/5" />

      {/* Body + CTA selalu di bawah */}
      <div
        className={[
          "px-8 md:px-16 py-8 flex-1 flex flex-col justify-end bg-gradient-to-b",
          bodyGrad,
        ].join(" ")}>
        <p className="text-sm text-gray-500 text-center mb-3">
          {lang === "en"
            ? en.answerCard.tapToChoose
            : id.answerCard.tapToChoose}{" "}
          {choose}
        </p>

        <button
          type="button"
          onClick={async () => await FnVote(choose)}
          disabled={disabled || isLoading}
          className={[
            "w-full rounded-lg px-6 py-3 text-white font-semibold",
            "bg-gradient-to-r transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-black/10",
            "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
            "cursor-pointer",
            btnGrad,
          ].join(" ")}
          aria-label={`Choose option ${choose}`}>
          {lang === "en" ? en.answerCard.choose : id.answerCard.choose} {choose}
        </button>
      </div>
    </div>
  );
};

export default AnswerCard;
