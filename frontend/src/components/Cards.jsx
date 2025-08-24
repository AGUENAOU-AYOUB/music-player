import { useState } from "react";

function TrackCardHorizontal({ track }) {
  const [isClicked, setClicked] = useState(false);

  return (
    <div className="w-[200px] h-[250px] flex flex-col bg-[hsla(0,0%,81%,1)] rounded-[12px] font-poppins overflow-hidden backdrop-blur-md  pb-1 group transtion-all duration-500 ease-in-out hover:-translate-y-1">
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
        >
          {isClicked ? (
            <i className="fa-solid fa-pause text-3xl text-white"></i>
          ) : (
            <i className="fa-solid fa-play text-3xl text-white"></i>
          )}
        </button>
      </div>
      <div className=" flex flex-col gap-[0.5rem] md:gap-[1rem] w-full h-[50px] px-1 py-1 md:py-2 md:px-2  ">
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
function TrackCardVertical({ track }) {
  return (
    <div className="w-[400px] h-[100px] flex flex-row items-center justify-between gap-1 bg-[hsla(0,0%,81%,1)] rounded-[12px] font-poppins overflow-hidden backdrop-blur-md ">
      <div className="w-[100px] h-full overflow-hidden rounded-[12px]">
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
    <div className="w-[200px] h-[250px] flex flex-col justify-end items-center overflow-hidden transition-all duration-500 ease-in-out group hover:-translate-y-1">
      <div className=" w-full h-[200px] rounded-[200px] overflow-hidden relative ">
        <img
          src={artist.picture_medium}
          alt={artist.name}
          className="w-full h-full object-cover object-center transition-all duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="w-full h-full inset-0 transition-all duration-500 ease-in-out group-hover:shadow-[inset_0px_0px_20px_5px_rgba(0,0,0,0.6)]  absolute z-10"></div>
      </div>
      <h2 className="font-poppins font-semibold text-[#000000] mt-2">
        {artist.name}
      </h2>
    </div>
  );
}
function AlbumCard({ album }) {
  return (
    <div className="w-[500px] h-[200px] flex flex-row items-center justify-between gap-1 bg-[hsla(0,0%,81%,1)] rounded-[12px] font-poppins overflow-hidden backdrop-blur-md group transtion-all duration-500 ease-in-out hover:-translate-y-1">
      <div className="w-[200px] h-full overflow-hidden rounded-[12px] relative">
        <img
          src={album?.cover_medium}
          alt={album?.artist?.name}
          className="w-full h-full object-center object-cover group-hover:scale-110 transtion-all duration-500 ease-in-out"
        />
        <div className="w-full h-full inset-0 transition-all duration-500 ease-in-out group-hover:shadow-[inset_0px_0px_20px_5px_rgba(0,0,0,0.6)]  absolute z-10"></div>
      </div>
      <div className=" flex flex-col gap-[0.5rem] md:gap-[1rem] w-[300px] h-full px-1 py-1 md:py-2 md:px-2 justify-center  ">
        <h2 className="font-semibold text-[30px] md:text-[36px]">
          {album?.title}
        </h2>
        <h3 className="font-normal text-[20px] md:text-[24px] text-[#797979] ">
          {album?.artist?.name}
        </h3>
      </div>
    </div>
  );
}
export { TrackCardVertical, TrackCardHorizontal, ArtistCard, AlbumCard };
