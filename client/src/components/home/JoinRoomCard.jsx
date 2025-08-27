import useAllStore from "../../stores";

const JoinRoomCard = () => {
  const { displayName, roomCode, setRoomCode, setDisplayName } = useAllStore();

  return (
    <div className="w-full bg-white shadow-xl px-8 md:px-16 py-12 flex flex-col gap-8 rounded-xl">
      <p className="font-semibold text-2xl text-center">Join Room</p>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="displayName">
            Display Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-lg p-3 border border-gray-400"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="roomCode">
            Room Code <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="roomCode"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="w-full rounded-lg p-3 border border-gray-400"
            placeholder="e.g, ABC123"
          />
        </div>

        <button
          type="submit"
          className="bg-primary p-3 rounded-lg text-surface cursor-pointer hover:bg-blue-700"
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default JoinRoomCard;
