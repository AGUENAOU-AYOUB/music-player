import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";

function TrackCardHorizontal({ track }) {
  const [isClicked, setClicked] = useState(false);

  return (
    <div className="w-full max-w-[220px] aspect-[4/5] h-[250px] flex flex-col bg-[hsla(0,0%,81%,1)] rounded-[12px] font-poppins overflow-hidden backdrop-blur-md  pb-1 group transition-all duration-500 ease-in-out hover:-translate-y-1">
      <div className="w-full h-[200px] overflow-hidden rounded-[12px] relative">
        <img
          src={track?.album?.cover_medium}
          alt={track?.artist?.name}
          className="w-full h-full object-center object-cover group-hover:scale-110 transition-all duration-500 ease-in-out"
        />
        <button
          onClick={() => setClicked((isClicked) => !isClicked)}
          className="w-full h-full inset-0 transition-all duration-500 ease-in-out group-hover:shadow-[inset_0px_0px_20px_5px_rgba(0,0,0,0.6)] opacity-0 group-hover:opacity-100 absolute z-10 "
          aria-label={isClicked ? "Pause" : "Play"}
          type="button"
          aria-pressed={isClicked}
        >
          {isClicked ? (
            <i className="fa-solid fa-pause text-3xl text-white"></i>
          ) : (
            <i className="fa-solid fa-play text-3xl text-white"></i>
          )}
        </button>
      </div>
      <div className=" flex flex-col gap-[0.5rem] md:gap-[1rem] w-full h-[50px] px-1 py-1 md:py-2 md:px-2  ">
        <h2 className="font-semibold text-[16px] md:text-[18px] truncate">
          {track?.title}
        </h2>
        <h3 className="font-normal text-[12px] md:text-[14px] text-[#797979] truncate ">
          {track?.artist?.name}
        </h3>
      </div>
    </div>
  );
}

function TrackCardVertical({ track }) {
  const [isClicked, setClicked] = useState(false);
  const { playTrack } = usePlayer();
  return (
    <div className="w-[400px] h-[100px] flex flex-row items-center justify-between gap-1 bg-[hsla(0,0%,81%,1)] rounded-[12px] font-poppins overflow-hidden backdrop-blur-md ">
      <div className="w-[100px] h-full overflow-hidden rounded-[12px]">
        <button
          onClick={() => {
            setClicked((isClicked) => !isClicked);
            playTrack(track);
          }}
          className="w-full h-full inset-0 transition-all duration-500 ease-in-out group-hover:shadow-[inset_0px_0px_20px_5px_rgba(0,0,0,0.6)] opacity-0 group-hover:opacity-100 absolute z-20 "
          aria-label={isClicked ? "Pause" : "Play"}
          type="button"
          aria-pressed={isClicked}
        >
          {isClicked ? (
            <i className="fa-solid fa-pause text-3xl text-white"></i>
          ) : (
            <i className="fa-solid fa-play text-3xl text-white"></i>
          )}
        </button>
        <img
          src={track?.album?.cover_medium}
          alt={track?.artist?.name}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className=" flex flex-col gap-[0.5rem] md:gap-[1rem] w-[300px] h-full px-1 py-1 md:py-2 md:px-2 justify-center  ">
        <h2 className="font-semibold text-[16px] md:text-[18px]">
          {track?.title}
        </h2>
        <h3 className="font-normal text-[12px] md:text-[14px] text-[#797979] ">
          {track?.artist?.name}
        </h3>
      </div>
    </div>
  );
}

function ArtistCard({ artist }) {
  return (
    <div
      className="snap-start shrink-0 w-[106px] md:w-[122px] lg:w-[178px] 
                    flex flex-col items-center"
    >
      <div
        className="relative w-full aspect-square rounded-full overflow-hidden 
                      transition-transform duration-300 md:hover:-translate-y-1"
      >
        <img
          src={artist.picture_big}
          alt={artist.name}
          className="h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-0
                        md:group-hover:opacity-100 transition-opacity duration-300 
                        shadow-[inset_0_0_20px_6px_rgba(0,0,0,0.35)]"
        ></div>
      </div>

      <h2
        className="mt-2 w-full text-center truncate 
                     text-xs md:text-sm lg:text-base font-medium"
      >
        {artist.name}
      </h2>
    </div>
  );
}

function AlbumCard({ album }) {
  const [isClicked, setClicked] = useState(false);
  const { playTrack } = usePlayer();
  return (
    <div className="snap-start shrink-0 w-full h-[100px] lg:h-[150px] flex flex-row items-center  gap-1 bg-[hsla(0,0%,81%,1)] rounded-[12px] font-poppins overflow-hidden backdrop-blur-md group transition-all duration-500 ease-in-out hover:-translate-y-1">
      <div className="min-w-[100px] lg:min-w-[150px]  h-full overflow-hidden rounded-[12px] relative">
        <button
          onClick={() => {
            setClicked((isClicked) => !isClicked);
            playTrack(album);
          }}
          className="w-full h-full inset-0 transition-all duration-500 ease-in-out group-hover:shadow-[inset_0px_0px_20px_5px_rgba(0,0,0,0.6)] opacity-0 group-hover:opacity-100 absolute z-20 "
          aria-label={isClicked ? "Pause" : "Play"}
          type="button"
          aria-pressed={isClicked}
        >
          {isClicked ? (
            <i className="fa-solid fa-pause text-3xl text-white"></i>
          ) : (
            <i className="fa-solid fa-play text-3xl text-white"></i>
          )}
        </button>
        <img
          src={album?.album?.cover_medium}
          alt={album?.artist?.name}
          className="w-full h-full object-center object-cover group-hover:scale-110 transition-all duration-500 ease-in-out"
        />
        <div className="w-full h-full inset-0 transition-all duration-500 ease-in-out group-hover:shadow-[inset_0px_0px_5px_5px_rgba(0,0,0,0.2)]  absolute z-10"></div>
      </div>
      <div className=" flex flex-col gap-[0.5rem] md:gap-[1rem] w-full h-full px-1 py-1 md:py-2 md:px-2 justify-center   ">
        <h2 className="font-semibold text-sm md:text-md lg:text-xl truncate">
          {album?.title}
        </h2>
        <h3 className="font-normal text-sm md:text-[0.6em] text-[#797979] truncate ">
          {album?.artist?.name}
        </h3>
      </div>
    </div>
  );
}
export { TrackCardVertical, TrackCardHorizontal, ArtistCard, AlbumCard };
