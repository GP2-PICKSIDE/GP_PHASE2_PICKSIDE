import ResultCard from "./ResultCard";

const Reveal = () => {
  return (
    <>
      <div className="flex flex-col gap-2 text-gray-400">
        <h1 className="text-2xl md:text-4xl font-semibold text-center">
          Results
        </h1>
        <p>Next round starting... 5</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32">
        <ResultCard choose="A" />
        <ResultCard choose="B" />
      </div>
    </>
  );
};

export default Reveal;
