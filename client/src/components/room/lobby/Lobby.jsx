import HostSettingCard from "./HostSettingCard";
import PlayersCard from "./PlayersCard";

const Lobby = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <PlayersCard />

      <HostSettingCard />
    </div>
  );
};

export default Lobby;
