import { usePlayer } from "../context/PlayerContext";

function Favorites() {
  const { favorite, current, isPlaying, playTrack, toggleFavorite } =
    usePlayer();

  if (!favorite?.length) {
    return (
      <section className="w-full rounded-xl border border-black/10 bg-white/60 backdrop-blur-lg text-black p-4">
        <h2 className="text-lg font-semibold mb-2">Favorites</h2>
        <p className="text-sm text-black/70">
          No favorites yet. Tap the heart on a track to add it.
        </p>
      </section>
    );
  }

  const clearAll = () => {
    favorite.forEach((song) => toggleFavorite(song));
  };

  return (
    <section className="w-full rounded-xl border border-black/10 bg-white/60 backdrop-blur-lg text-black p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold font-poppins">
          Favorites ({favorite.length})
        </h2>
        <button
          type="button"
          onClick={clearAll}
          className="text-xs px-2 py-1 rounded border border-black/20 hover:bg-black/10 font-poppins"
          aria-label="Clear all favorites"
          title="Clear all"
        >
          Clear
        </button>
      </div>

      <div className="flex max-h-80 flex-col gap-2 overflow-y-auto pr-1 select-none">
        {favorite.map((song) => {
          const isCurrent = current?.id === song.id;
          const label = `${song.title ?? "Unknown title"} — ${
            song.artist ?? "Unknown artist"
          }`;

          return (
            <div
              key={song.id}
              className="flex items-center gap-3 p-2 rounded hover:bg-black/5"
            >
              <img
                src={song.cover}
                alt={song.title || "cover"}
                className="w-12 h-12 rounded object-cover ring-1 ring-black/10"
                loading="lazy"
              />

              <div className="min-w-0 flex-1">
                <p className="font-medium truncate font-poppins">
                  {song.title}
                </p>
                <p className="text-xs text-black/60 truncate font-poppins">
                  {song.artist}
                </p>{" "}
                {/* ✅ readable on light bg */}
              </div>

              <button
                type="button"
                className="p-2 rounded hover:bg-black/10"
                onClick={() => playTrack(song)}
                aria-label={
                  isCurrent && isPlaying ? `Pause ${label}` : `Play ${label}`
                }
                title={isCurrent && isPlaying ? "Pause" : "Play"}
              >
                <i
                  className={`fa-solid ${
                    isCurrent && isPlaying ? "fa-pause" : "fa-play"
                  } text-xl text-black`} // ✅ black icon on light bg
                ></i>
              </button>

              <button
                type="button"
                className="p-2 rounded hover:bg-black/10"
                onClick={() => toggleFavorite(song)}
                aria-label={`Remove ${label} from favorites`}
                title="Unfavorite"
              >
                <i className="fa-solid fa-heart text-red-500"></i>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Favorites;
