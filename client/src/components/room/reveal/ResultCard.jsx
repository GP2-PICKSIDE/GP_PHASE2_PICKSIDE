import { initials } from "../../../utils/initialsName";

const ResultCard = ({
  choose,
  percent = 0,
  count = 0,
  voters = [],
  players = [],
}) => {
  const nameOf = (id) => {
    const p = players.find((x) => x.id === id);
    return p?.name || "?";
  };

  return (
    <div className="w-full bg-white shadow-xl flex flex-col gap-8">
      <div>
        <div
          className={`w-full flex justify-center ${
            choose === "A" ? "bg-primary" : "bg-secondary"
          } px-16 md:px-24 py-6 rounded-t-xl flex-col`}
        >
          <h1 className="text-4xl text-white font-semibold text-center">
            {choose}
          </h1>
        </div>

        <div
          className={`w-full flex justify-center text-center flex-col gap-4 ${
            choose === "A" ? "bg-primary/50" : "bg-secondary/50"
          } px-16 md:px-24 py-16 flex-col rounded-b-xl`}
        >
          <p className="text-white text-5xl font-semibold">{percent}%</p>
          <p className="text-2xl text-white">
            {count} {count === 1 ? "vote" : "votes"}
          </p>

          {/* PlayerAvatar -> initials */}
          <div className="flex gap-2 flex-wrap justify-center mt-4">
            {voters.map((voter) => (
              <span
                key={voter.id}
                className="bg-secondary rounded-full text-white px-2 py-2 text-sm md:text-base"
                title={nameOf(voter.id)}
              >
                {initials(nameOf(voter.id))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
