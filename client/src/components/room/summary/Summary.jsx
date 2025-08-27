const Summary = () => {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold text-center">
        Game Summary
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:px-32">
        <div className="flex flex-col gap-4">
          <div className="w-full bg-white shadow-xl p-8 flex flex-col gap-4 rounded-xl">
            <p className="font-semibold text-2xl">Overall</p>
            <div className="flex justify-between px-4 py-2 bg-primary rounded-2xl w-full">
              <span className="text-white">60%</span>
            </div>
            <div className="flex justify-between px-4 py-2 bg-secondary rounded-2xl w-full">
              <span className="text-white">40%</span>
            </div>
            <p className="font-semibold">Rounds played: 5</p>
            <div>
              <p className="font-semibold">Top voted questions</p>
              <p className="text-gray-400">Would you rather ......</p>
            </div>
            <p className="font-semibold">Players participated: 6</p>
          </div>

          <button
            type="button"
            className="w-full bg-primary p-3 rounded-xl text-white cursor-pointer hover:bg-blue-700"
          >
            Play again
          </button>
          <button
            type="button"
            className="w-full border border-gray-400 p-3 rounded-xl cursor-pointer hover:bg-gray-200"
          >
            Back to Home
          </button>
        </div>

        <div className="w-full bg-white shadow-xl p-8 flex flex-col gap-4 rounded-xl">
          <p className="font-semibold text-2xl">Rounds</p>

          {/* rounds */}
          <div className="flex flex-col gap-4">
            {/* round */}
            <div className="flex gap-4">
              <span>1</span>
              <div className="flex flex-col gap-2 w-full">
                <span>Would you rather ....</span>
                <div className="flex justify-between px-4 py-2 bg-secondary rounded-2xl w-full">
                  <span className="text-white">50%</span>
                  <span>75%</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <span>1</span>
              <div className="flex flex-col gap-2 w-full">
                <span>Would you rather ....</span>
                <div className="flex justify-between px-4 py-2 bg-secondary rounded-2xl w-full">
                  <span className="text-white">50%</span>
                  <span>75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
