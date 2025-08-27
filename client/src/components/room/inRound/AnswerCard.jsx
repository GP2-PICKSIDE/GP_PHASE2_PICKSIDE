const AnswerCard = ({ choose, options }) => {
  return (
    <div className="w-full bg-white shadow-xl px-16 md:px-24 py-16 flex flex-col gap-8 rounded-xl">
      <div className="flex flex-col gap-6 items-center">
        <span
          className={`${
            choose === "A" ? "bg-primary" : "bg-secondary"
          } rounded-full w-12 h-12 text-3xl text-white text-center flex items-center justify-center font-semibold`}>
          {choose}
        </span>
        <p className="text-center font-semibold">{options || "Loading..."}</p>
        <button
          type="button"
          className={`${
            choose === "A" ? "bg-primary" : "bg-secondary"
          } text-white rounded-lg px-8 py-3 w-full`}>
          Choose {choose}
        </button>
      </div>
    </div>
  );
};

export default AnswerCard;
