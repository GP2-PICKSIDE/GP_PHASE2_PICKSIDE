const CreateRoomcard = () => {
  return (
    <div className="w-full bg-white shadow-xl px-8 md:px-16 py-12 flex flex-col gap-8 rounded-xl">
      <p className="font-semibold text-2xl text-center">Create Room</p>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="displayName">
            Display Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="displayName"
            className="w-full rounded-lg p-3 border border-gray-400"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="roomName">
            Room Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="roomName"
            className="w-full rounded-lg p-3 border border-gray-400"
            placeholder="Room name"
          />
        </div>

        <button
          type="submit"
          className="bg-primary p-3 rounded-lg text-surface cursor-pointer hover:bg-blue-700"
        >
          Create Room
        </button>
        <p className="text-center text-gray-400 text-sm">
          You'll configure theme & language in the lobby
        </p>
      </form>
    </div>
  );
};

export default CreateRoomcard;
