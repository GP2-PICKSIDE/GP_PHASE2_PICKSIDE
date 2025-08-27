import { initials } from "../../../utils/initialsName";

const PlayersCard = () => {
  return (
    <div className="w-full bg-white shadow-xl px-8 md:px-16 py-12 flex flex-col gap-8 rounded-xl">
      <p className="font-semibold text-2xl">Players in Room</p>

      <div className="flex flex-col gap-8">
        <div className="flex justify-between w-full md:gap-24">
          <div className="font-medium flex gap-4 items-center">
            <div>
              <span className="w-4 h-6 bg-secondary rounded-full text-white p-2">
                {initials("tes halo")}
              </span>
            </div>
            <span>tes halo</span>
          </div>
          <span className="md:block hidden text-gray-400">Connected</span>
        </div>
      </div>
    </div>
  );
};

export default PlayersCard;
