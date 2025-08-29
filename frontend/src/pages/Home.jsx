import {
  TrackCardHorizontal,
  TrackCardVertical,
  AlbumCard,
  ArtistCard,
} from "../components/Cards";
import {
  getPopularTracks,
  getTopArtists,
  getPopularAlbums,
  search,
} from "../services/deezerService.js";
import { useState, useEffect } from "react";

function Home() {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    getTopArtists().then((res) => setArtists(res?.data ?? []));
    getPopularTracks().then((res) => setTracks(res?.data ?? []));
    getPopularAlbums().then((res) => setAlbums(res?.data ?? []));
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    search(query).then((res) => setResults(res?.data ?? []));
    setLoading(false);
  }, [query]);

  return (
    <main className="w-full h-screen flex flex-col ">
      <div>
        <input
          className="w-full h-10 md:h-12 rounded-full px-4 outline-none border border-white/40 bg-white/70 placeholder:text-gray-500"
          placeholder="Search…"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex flex-row flex-wrap">
        {loading && <p className="w-full  h-full items-center font-poppins font-bold text-white text-3xl">Loading...</p>}
        {results ? (
          results.map((result) => (
            <TrackCardVertical key={result.id} track={result} />
          ))
        ) : (
          <h1 className="w-full  h-full items-center font-poppins font-bold text-white text-3xl">Nothing Found:(</h1>
        )}
      </div>
      <section className="w-full">
        <h1 className="my-2 text-2xl font-semibold">Top Artists</h1>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2">
          {loading && <p className="w-full  h-full items-center font-poppins font-bold text-white text-3xl">Loading...</p>}
          {artists?.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
      <section className="w-full md:w-[50%] ">
        <h1 className="my-2 text-2xl font-semibold">Popular Tracks</h1>
        <div className="hidden md:flex w-full flex-col gap-4  h-[390px] lg:h-[335px]   overflow-y-auto py-4 scrollbar-hide  snap-y snap-mandatory">
          {tracks?.map((track) => (
            <AlbumCard key={track.id} album={track} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
