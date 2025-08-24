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
  search
} from "../services/deezerService.js";
import { useState, useEffect } from "react";

function Home() {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [query, setQuery] = useState('');
  const [results , setResults] = useState([]);


  

  const handleChange = (e)=>{
    e.preventDefault();

    setQuery(e.target.value)
  }

    
 

  useEffect(() => {
    getTopArtists().then((res) => setArtists(res?.data ?? []));
    getPopularTracks().then((res) => setTracks(res?.data ?? []));
    getPopularAlbums().then((res) => setAlbums(res?.data ?? []));
  }, []);
  useEffect(()=>{
    search(query).then((res)=> setResults(res?.data ?? []))
  },[query])

  return (
    <main>
      <div >
      <input
        className="w-full h-10 md:h-12 rounded-full px-4 outline-none border border-white/40 bg-white/70 placeholder:text-gray-500"
        placeholder="Search…"
        onChange={handleChange}
      />
      </div>
      <div className="w-full flex flex-row flex-wrap">
        {results ? results.map((result)=>(
          <TrackCardHorizontal key={result.id} track={result} />
        )) : (<h1>Nothing Found:(</h1>) }
      </div>

    </main>
  );
}

export default Home;
