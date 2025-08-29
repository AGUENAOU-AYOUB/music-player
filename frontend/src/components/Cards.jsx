import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";

function TrackCardHorizontal({ track }) {
  const { current, isPlaying, playTrack, togglePlay } = usePlayer();
  const isCurrent = current?.id === track.id;

  const cover =
    track?.album?.cover_medium ?? track?.cover ?? track?.track?.cover;

  const artistName =
    track?.artist?.name ?? track?.artist ?? track?.contributors?.[0]?.name;

  return (
    <div className="w-full max-w-[220px] aspect-[4/5] h-[250px] flex flex-col bg-[hsla(0,0%,81%,1)] rounded-[12px] font-poppins overflow-hidden backdrop-blur-md pb-1 group transition-all duration-500 ease-in-out hover:-translate-y-1">
      <div className="relative w-full h-[200px] overflow-hidden rounded-[12px]">
        <img
          src={cover}
          alt={artistName || track?.title || "cover"}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <button
          onClick={() => {
            if (isCurrent) {
              togglePlay();
            } else {
              playTrack(track);
            }
          }}
          type="button"
          aria-label={isCurrent && isPlaying ? "Pause" : "Play"}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/30 hover:bg-black/40 z-10"
        >
          <i
            className={`fa-solid ${
              isCurrent && isPlaying ? "fa-pause" : "fa-play"
            } text-3xl text-white`}
          ></i>
        </button>
      </div>
      <div className="flex flex-col gap-1 md:gap-2 w-full h-[50px] px-2 py-1 justify-center">
        <h2 className="font-semibold text-[16px] md:text-[18px] truncate">
          {track?.title}
        </h2>
        <h3 className="font-normal text-[12px] md:text-[14px] text-[#797979] truncate">
          {artistName || "—"}
        </h3>
      </div>
    </div>
  );
}

function SearchRes({ res }) {
  const [isClicked, setClicked] = useState(false);
  const { current, isPlaying, playTrack, togglePlay } = usePlayer();

  const isCurrent = current?.id === res.id;
  const cover = res?.album?.cover_medium ?? res?.cover ?? res?.track?.cover;

  const artistName =
    res?.artist?.name ?? res?.artist ?? res?.contributors?.[0]?.name;

  return (
    <div className="w-full flex flex-row  group mb-2 pb-2 border-b-[1px] border-[#ffffff1a] shadow-sm pt-4 bg">
      <div className="relative w-20 h-full overflow-hidden rounded-2xl group ">
        <button
          onClick={() => {
            if (isCurrent) {
              togglePlay();
            } else {
              playTrack(res);
            }
          }}
          type="button"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/30 group-hover:bg-black/40"
        >
          {" "}
          <i
            className={`fa-solid ${
              isCurrent && isPlaying ? "fa-pause" : "fa-play"
            } text-2xl text-white`}
          ></i>
        </button>
        <img src={cover} alt={artistName} className="aspect-square object-cover" />
      </div>
      <div className="w-full h-full ml-2 md:ml-4 flex items-center font-poppins text-xl">
        <h2>{res.title}</h2>
      </div>
    </div>
  );
}

function TrackCardVertical({ track }) {
  const [isClicked, setClicked] = useState(false);
  const { current, isPlaying, playTrack, togglePlay } = usePlayer();

  const isCurrent = current?.id === track.id;
  const cover =
    track?.album?.cover_medium ?? track?.cover ?? track?.track?.cover;

  const artistName =
    track?.artist?.name ?? track?.artist ?? track?.contributors?.[0]?.name;

  return (
    <div className=" snap-start shrink-0 w-full md:w-3/4 h-[100px] flex flex-row items-center  gap-1 bg-[hsla(0,0%,81%,1)] rounded-[12px] font-poppins overflow-hidden backdrop-blur-md ">
      <div className="relative w-[100px] h-full overflow-hidden rounded-[12px] group">
        <button
          onClick={() => {
            if (isCurrent) {
              togglePlay();
            } else {
              playTrack(track);
            }
          }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/30 group-hover:bg-black/40"
          type="button"
        >
          <i
            className={`fa-solid ${
              isCurrent && isPlaying ? "fa-pause" : "fa-play"
            } text-3xl text-white`}
          ></i>
        </button>
        <img
          src={cover}
          alt={artistName || track?.title || "cover"}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className=" flex flex-col gap-[0.5rem] md:gap-[1rem] w-[300px] h-full px-1 py-1 md:py-2 md:px-2 justify-center  ">
        <h2 className="font-semibold text-sm md:text-md">{track?.title}</h2>
        <h3 className="font-normal text-sm md:text-md text-[#797979] ">
          {artistName || "—"}
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

      <h2 className="mt-2 w-full text-center truncate text-xs md:text-sm lg:text-base font-medium">
        {artist.name}
      </h2>
    </div>
  );
}

function AlbumCard({ album }) {
  const [isClicked, setClicked] = useState(false);
  const { current, isPlaying, playTrack, togglePlay } = usePlayer();
  const isCurrent = current?.id === album.id;

  const cover =
    album?.album?.cover_medium ?? album?.cover ?? album?.album?.cover;

  const artistName =
    album?.artist?.name ?? album?.artist ?? album?.contributors?.[0]?.name;
  return (
    <div className="snap-start shrink-0 w-full h-[100px] lg:h-[150px] flex flex-row items-center  gap-1 bg-[hsla(0,0%,81%,1)] rounded-[12px] font-poppins overflow-hidden backdrop-blur-md group transition-all duration-500 ease-in-out hover:-translate-y-1">
      <div className="min-w-[100px] lg:min-w-[150px]  h-full overflow-hidden rounded-[12px] relative">
        <button
          onClick={() => {
            if (isCurrent) {
              togglePlay();
            } else {
              playTrack(album);
            }
          }}
          className="w-full h-full inset-0 transition-all duration-500 ease-in-out group-hover:shadow-[inset_0px_0px_20px_5px_rgba(0,0,0,0.6)] opacity-0 group-hover:opacity-100 absolute z-20 "
          aria-label={isCurrent && isPlaying ? "Pause" : "Play"}
          type="button"
        >
          <i
            className={`fa-solid ${
              isCurrent && isPlaying ? "fa-pause" : "fa-play"
            } text-3xl text-white`}
          ></i>
        </button>
        <img
          src={cover}
          alt={artistName || album?.title || "cover"}
          className="w-full h-full object-center object-cover group-hover:scale-110 transition-all duration-500 ease-in-out"
        />
        <div className="w-full h-full inset-0 transition-all duration-500 ease-in-out group-hover:shadow-[inset_0px_0px_5px_5px_rgba(0,0,0,0.2)]  absolute z-10"></div>
      </div>
      <div className=" flex flex-col gap-[0.5rem] md:gap-[1rem] w-full h-full px-1 py-1 md:py-2 md:px-2 justify-center   ">
        <h2 className="font-semibold text-sm md:text-md lg:text-xl truncate">
          {album?.title}
        </h2>
        <h3 className="font-normal text-sm md:text-[0.6em] text-[#797979] truncate ">
          {artistName || "—"}
        </h3>
      </div>
    </div>
  );
}
export {
  TrackCardVertical,
  TrackCardHorizontal,
  ArtistCard,
  AlbumCard,
  SearchRes,
};
