import CreateRoomcard from "../components/home/CreateRoomCard";
import JoinRoomCard from "../components/home/JoinRoomCard";

const HomePage = () => {
  return (
    <div className="px-8 md:px-16 py-6 flex flex-col gap-12 justify-center items-center min-h-screen">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Create or Join Room
        </h1>
        <p className="text-gray-500">Create or join room to start</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Create Room */}
        <CreateRoomcard />

        {/* Join Room */}
        <JoinRoomCard />
      </div>
    </div>
  );
};
export default HomePage;
