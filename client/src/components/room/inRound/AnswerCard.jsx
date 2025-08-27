import { useMutation } from "@tanstack/react-query";
import useGameStore from "../../../stores/gameStore";

const AnswerCard = ({ choose, option, disabled }) => {
  const { FnVote } = useGameStore();

  const { mutate } = useMutation({
    mutationKey: ["vote"],
    mutationFn: (choice) => FnVote(choice),
  });

  const isA = choose === "A";
  const headBg = isA ? "bg-primary" : "bg-secondary";
  const bodyGrad = isA
    ? "from-primary/10 to-primary/5"
    : "from-secondary/10 to-secondary/5";
  const btnBg = isA
    ? "bg-primary hover:bg-blue-700"
    : "bg-secondary hover:bg-purple-700";

  const isLoading = !option || option === "Loading...";

  return (
    <div
      className="
        w-full h-full flex flex-col rounded-2xl overflow-hidden bg-white
        shadow-xl transition-all duration-200
        hover:shadow-2xl
      "
    >
      {/* Header ringkas */}
      <div className="px-8 pt-8 pb-4 flex flex-col items-center gap-4">
        <span className="relative">
          <span
            className={`${headBg} rounded-full w-12 h-12 text-2xl text-white flex items-center justify-center font-semibold`}
          >
            {choose}
          </span>
          <span className="absolute inset-0 rounded-full ring-4 ring-black/5" />
        </span>

        {/* Judul opsi / skeleton */}
        {isLoading ? (
          <div className="w-52 h-6 rounded-md bg-black/10 animate-pulse" />
        ) : (
          <p className="text-center font-semibold text-lg md:text-xl leading-snug">
            {option}
          </p>
        )}
      </div>

      {/* garis halus */}
      <div className="h-px w-full bg-black/5" />

      {/* Body lembut + tombol selalu nempel bawah */}
      <div
        className={`px-8 md:px-16 py-8 flex-1 flex flex-col justify-end bg-gradient-to-b ${bodyGrad}`}
      >
        {/* hint kecil biar nggak terlalu kosong */}
        <p className="text-sm text-gray-500 text-center mb-3">
          Tap to choose {choose}
        </p>

        <button
          type="button"
          onClick={() => mutate(choose)}
          disabled={disabled || isLoading}
          className={[
            "w-full rounded-lg px-6 py-3 text-white font-semibold",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-black/10",
            "active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "cursor-pointer",
            btnBg,
          ].join(" ")}
          aria-label={`Choose option ${choose}`}
        >
          Choose {choose}
        </button>
      </div>
    </div>
  );
};

export default AnswerCard;
