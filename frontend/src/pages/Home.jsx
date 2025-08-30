import {
  TrackCardHorizontal,
  TrackCardVertical,
  AlbumCard,
  ArtistCard,
  SearchRes,
} from "../components/Cards";
import {
  getPopularTracks,
  getTopArtists,
  getPopularAlbums,
  search,
} from "../services/deezerService.js";
import { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext.jsx";

function Home() {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { recent, playTrack } = usePlayer();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);


  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setPage(0);
    setResults([]);
  };

   useEffect(() => {
    setLoading(true);
    Promise.all([
      getTopArtists(),
      getPopularTracks(),
      getPopularAlbums(),
    ]).then(([a, t, al]) => {
      setArtists(a?.data ?? []);
      setTracks(t?.data ?? []);
      setAlbums(al?.data ?? []);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
  const fetchResults = async () => {
    if (!query) return;
    setLoading(true);
    const res = await search(query, page * 10, 10);
    if (res?.data) {
      if (page === 0) {
        setResults(res.data);
      } else {
        setResults(prev => [...prev, ...res.data]);
      }
    
      const loaded = (page + 1) * 10;
      setHasMore(loaded < res.total);
    }
    setLoading(false);
  };
  fetchResults();
}, [query, page]);


  return (
    <main className="w-full h-screen flex flex-col sm-4 relative ">
      <div className="w-full min-h-10 md:h-12 rounded-full  border border-white/40 bg-white/70 z-50  flex flex-row overflow-hidden ">
        <input
          className="h-full outline-none  placeholder:text-gray-500 font-poppins bg-transparent border-r-[1px] border-[#ffffff57] w-full px-4   "
          placeholder="Search…"
          onChange={handleChange}
          value={query}
        />
        <button className="w-12 ml-auto h-full flex items-center justify-center ">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div
        className={`${
          results.length > 0
            ? "w-full h-[600px] flex flex-col items-end overflow-y-auto scrollbar-hide top-11 snap-y snap-mandatory mt-1 bg-white/60 backdrop-blur-md rounded-2xl absolute z-40 "
            : "hidden"
        }`}
      >
        <div
          onClick={() => {
            setResults([]);
            setQuery('');
          }}
          className="right-5 p-2 border-black rounded-lg sticky border-2 top-3 group items-center hover:scale-110  flex"
        >
          <i className="fa-solid fa-x    group-hover:shadow-lg transition-all duration-500 ease-in-out"></i>
        </div>
        {results && (
          <div className="w-full  flex flex-col px-2 mt-1  ">
            {results.map((result) => (
              <SearchRes key={result.id} res={result} />
            ))}
          </div>
          
        )}
         {hasMore && (
      <button
        onClick={() => setPage(prev => prev + 1)}
        className="mx-auto my-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
      >
        Load more
      </button>
    )}
      </div>
      <section className="w-full px-2 ">
        <h1 className="my-2 text-2xl font-semibold">Top Artists</h1>

        <div className="flex flex-row gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory ">
          {artists?.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
      <section className="flex md:flex-row flex-col">
        <section className="w-full md:w-[50%] px-2 ">
          <h1 className="my-2 text-2xl font-semibold">Popular Tracks</h1>
          <div className="hidden md:flex w-full flex-col gap-4  h-[390px] lg:h-[335px]   overflow-y-auto py-4 scrollbar-hide  snap-y snap-mandatory relative">
            {tracks?.map((track) => (
              <AlbumCard key={track.id} album={track} />
            ))}
          </div>
          <div className="md:hidden  w-full flex-col flex gap-2 h-[250px] px-2  overflow-y-auto scrollbar-hide  snap-y snap-mandatory">
            {tracks?.map((track) => (
              <AlbumCard key={track.id} album={track} />
            ))}
          </div>
        </section>
        <section className="w-full md:w-[50%] px-2">
          <h1 className="my-2 text-2xl font-semibold md:ml-28 ">
            Recently Played
          </h1>
          <div className="w-full flex-col flex gap-2 h-[250px] md:h-[335px] px-2 md:items-center overflow-y-auto scrollbar-hide  snap-y snap-mandatory">
            {recent?.map((recent) => (
              <TrackCardVertical key={recent.id} track={recent} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Home;
