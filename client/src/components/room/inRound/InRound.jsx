import { initials } from "../../../utils/initialsName";
import AnswerCard from "./AnswerCard";

const InRound = () => {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold text-center">
        Would you rather...
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
