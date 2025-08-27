import CreateRoomcard from "../components/home/CreateRoomCard";
import JoinRoomCard from "../components/home/JoinRoomCard";

const HomePage = () => {
  return (
    <div
      className="
        min-h-screen px-6 md:px-10 py-10
        bg-white
        bg-[radial-gradient(1200px_600px_at_50%_-200px,rgba(59,130,246,0.06),transparent)]
      "
    >
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Create or Join Room
        </h1>
        <p className="text-gray-500 mt-1">Create a room or enter a code to start</p>
      </header>

      <main className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <CreateRoomcard />
        <JoinRoomCard />
      </main>
    </div>
  );
};

export default HomePage;
