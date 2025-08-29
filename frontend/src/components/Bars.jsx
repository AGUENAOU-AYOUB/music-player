import HarmonyLogo from "../assets/HarmonyLogo.png";
import { Link } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
function SideBar() {
  const image = HarmonyLogo;
  return (
    <div className="w-full h-full md:bg-[#ffffffa1] bg-transparent backdrop-blur-lg flex flex-row  md:flex-col md:justify-between md:items-center justify-between items-center rounded-lg px-1 md:py-2 font-poppins">
      <div className="w-[105px] h-[33px] md:w-[205px] md:h-[65px] mt-2">
        <img src={image} className="w-full h-full object-fill object-center" />
      </div>
      <div className="w-[300px] h-full md:w-full md:h-[550px] flex flex-row  md:flex-col md:justify-center md:items-center justify-center items-center md:my-3 md:px-2 ">
        <ul className="w-full h-full flex flex-row justify-end items-center  md:flex-col md:gap-2 md:items-center md:justify-start text-[18px]">
          <li className="w-full h-[50px] flex items-center justify-center md:rounded-2xl md:hover:bg-[#ffffffc2] transition-all duration-500 ease-in-out hover:shadow-sm md:px-2 md:py-1">
            <Link
              to="/"
              className="text-xl md:text-3xl flex flex-row w-full justify-end md:justify-start items-center "
            >
              <i className="fa-regular fa-house"></i>
              <span className="ml-2 hidden md:inline text-[20px]">Home</span>
            </Link>
          </li>

          <li className="w-20 md:w-full h-[50px]  flex items-center justify-center md:rounded-2xl md:hover:bg-[#ffffffc2] transition-all duration-500 ease-in-out hover:shadow-sm md:px-2 md:py-1">
            <Link
              to="/favorites"
              className="text-xl md:text-3xl flex flex-row w-full justify-end md:justify-start items-center"
            >
              <i className="fa-regular fa-heart"></i>
              <span className="ml-2 hidden md:inline text-[20px]">
                Favorites
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-20 md:w-full md:h-[50px] flex flex-row  md:flex-col md:justify-center md:items-center justify-center items-center md:mb-2">
        <li className="w-full h-full flex items-center justify-center md:rounded-2xl md:hover:bg-[#ffffffc2] transition-all duration-500 ease-in-out hover:shadow-sm md:px-2 md:py-1">
          <Link
            to="/profile"
            className="text-xl md:text-3xl flex flex-row w-full justify-end md:justify-start items-center "
          >
            <i className="fa-regular fa-user"></i>
            <span className="ml-3 hidden md:inline text-[20px]">Profile</span>
          </Link>
        </li>
      </div>
    </div>
  );
}


function PlayingNow() {



  function fmt(sec) {
  if (!sec) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
function pct(progress, duration) {
  if (!duration || Number.isNaN(duration)) return 0;
  return Math.min(100, Math.max(0, (progress / duration) * 100));
}


  const {
    current,
    isPlaying,
    progress,
    duration,
    volume,
    setVolume,
    togglePlay,
    seekTo,
  } = usePlayer();

  return (
    <div
      className="
      w-full h-full
      rounded-2xl border border-black/10
      bg-white/60 
      backdrop-blur-xl shadow-lg
      px-4 md:px-6 py-3
      flex items-center gap-3 md:gap-5
    "
    >
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={current?.cover || "/placeholder.jpg"}
          alt={current?.title || "cover"}
          className="w-10 h-10 md:w-12 md:h-12 rounded-md object-cover ring-1 ring-black/10"
        />
        <div className="min-w-0 w-2/5">
          <div className="truncate font-medium text-sm md:text-base ">
            {current?.title || "Nothing playing"}
          </div>
          <div className="truncate text-[11px] md:text-xs text-neutral-600 ">
            {current?.artist || "—"}
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-3/5">
        <div className="relative mb-2">
          <div className="h-1 w-full rounded-full bg-black/10  overflow-hidden">
            <div
              className="h-full bg-black/70"
              style={{ width: `${pct(progress, duration)}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step="0.1"
            value={Math.min(progress, duration || 0)}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            aria-label="Seek"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className="p-2 rounded hover:bg-black/5 "
            aria-label="Previous"
            disabled
          >
            <i className="fa-solid fa-backward-step text-sm md:text-base opacity-50"></i>
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="h-8 w-8 md:h-10 md:w-10 grid place-items-center rounded-full border border-black/20 hover:bg-black/5"
          >
            <i
              className={`fa-solid ${
                isPlaying ? "fa-pause" : "fa-play"
              } text-sm md:text-base`}
            ></i>
          </button>

          <button
            type="button"
            className="p-2 rounded hover:bg-black/5 "
            aria-label="Next"
            disabled
          >
            <i className="fa-solid fa-forward-step text-sm md:text-base opacity-50"></i>
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <div className="text-xs tabular-nums text-neutral-600  w-[86px] text-right">
          {fmt(progress)} / {fmt(duration)}
        </div>

        <div className="flex items-center gap-2">
          <i className="fa-solid fa-volume-low text-xs opacity-70"></i>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 accent-black"
            aria-label="Volume"
          />
        </div>

        <button
          type="button"
          className="p-2 rounded hover:bg-black/5 "
          aria-label="Like"
        >
          <i className="fa-regular fa-heart text-base"></i>
        </button>
      </div>
    </div>
  );
}

export { SideBar, PlayingNow };
