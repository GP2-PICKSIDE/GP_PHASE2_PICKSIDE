import { useMutation } from "@tanstack/react-query";
import useAllStore from "../../stores";
import useGameStore from "../../stores/gameStore";
import { useNavigate } from "react-router";

const CreateRoomcard = () => {
  const navigate = useNavigate();
  const { FnCreateRoom } = useGameStore();
  const { displayName, roomName, setDisplayName, setRoomName } = useAllStore();

  const { mutate, isPending } = useMutation({
    mutationKey: ["createRoom"],
    mutationFn: FnCreateRoom,
    onSuccess: () => navigate("/room"),
  });

  const disabled = isPending;

  const baseInput =
    "w-full rounded-lg pl-10 pr-3 py-3 border bg-white text-gray-900 " +
    "border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/30 " +
    (disabled ? "opacity-60 cursor-not-allowed" : "");

  return (
    <section className="relative w-full rounded-2xl bg-white border border-black/5 shadow-md overflow-hidden">
      {/* header accent */}
      <div className="h-1 w-full bg-primary" />
      <div className="px-8 md:px-10 py-8 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">Create Room</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!disabled) mutate();
          }}
          className="flex flex-col gap-4"
          aria-busy={isPending}
        >
          {/* Display name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="displayName" className="text-sm text-gray-700">
              Display Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
              </svg>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className={baseInput}
                disabled={disabled}
              />
            </div>
          </div>

          {/* Room name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="roomName" className="text-sm text-gray-700">
              Room Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19Z"></path>
              </svg>

              <input
                id="roomName"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Room name"
                className={baseInput}
                disabled={disabled}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={disabled}
            className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition cursor-pointer
              ${
                disabled
                  ? "bg-primary/60 cursor-not-allowed"
                  : "bg-primary hover:bg-blue-700"
              }`}
          >
            {isPending ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Creating…
              </span>
            ) : (
              "Create Room"
            )}
          </button>

          <p className="text-center text-gray-500 text-sm">
            You'll configure theme & language in the lobby
          </p>
        </form>
      </div>

      {/* overlay */}
      {isPending && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-auto flex items-center justify-center">
          <div className="rounded-xl border border-black/10 bg-white px-6 py-4 shadow-sm">
            <p className="text-sm text-gray-700">Preparing your room…</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateRoomcard;
