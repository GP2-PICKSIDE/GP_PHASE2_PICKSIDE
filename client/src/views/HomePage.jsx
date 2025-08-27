import CreateRoomcard from "../components/home/CreateRoomCard";
import JoinRoomCard from "../components/home/JoinRoomCard";

const HomePage = () => {
  return (
    <div className="min-h-screen px-6 md:px-10 py-12 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800">
          Create or Join a Room
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Challenge your friends with tough choices!
        </p>
      </header>

      <main className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        <CreateRoomcard />
        <JoinRoomCard />
      </main>
    </div>
  );
};

export default HomePage;
