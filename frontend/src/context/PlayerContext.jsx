import {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [recent, setRecent] = useState([]);
  const [volume, setVolume] = useState(1);
 const [favorite, setFavorite] = useState(() => {
  try {
    const raw = localStorage.getItem("favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
});

useEffect(() => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorite));
  } catch {}
}, [favorite]);


  async function playTrack(track) {
    const previewUrl = track?.preview ?? track?.previewUrl ?? track?.audioUrl;
   
  if (!previewUrl) {
    console.warn("This item has no preview/audio URL:", track);
    return;
  }
   const next = {
    id: track?.id,
    title: track?.title,
    artist: track?.artist?.name ?? track?.artist, 
    cover: track?.album?.cover_medium ?? track?.cover,
    previewUrl, 
  };
   

    if (current?.id === next.id) {
      return togglePlay();
    }

    setCurrent(next);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);

     setRecent(prev => {
    const filtered = prev.filter(item => item.id !== next.id);
    return [next, ...filtered].slice(0, 20);
  });


    const audio = audioRef.current;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.src = previewUrl;

      await audio.play();
      setIsPlaying(true);
    } catch (e) {
      console.error("play() failed:", e);
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    const audio = audioRef.current;

    const onTime = () => setProgress(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!current) return;
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (e) {
        console.error("togglePlay play() failed:", e);
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function seekTo(sec) {
    const audio = audioRef.current;
    const safe = Math.max(0, Math.min(sec, duration || 0));
    audio.currentTime = safe;
    setProgress(sec);
  }

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);


  function isFav(id) {
  return favorite.some(f => f.id === id);
}

function addFavorite(track) {
  
  const previewUrl = track?.preview ?? track?.previewUrl ?? track?.audioUrl;
  const next = {
    id: track?.id,
    title: track?.title,
    artist: track?.artist?.name ?? track?.artist,
    cover: track?.album?.cover_medium ?? track?.cover,
    previewUrl,
  };
  setFavorite(prev => {
    if (prev.some(f => f.id === next.id)) return prev; 
    return [next, ...prev];
  });
}

function removeFavorite(id) {
  setFavorite(prev => prev.filter(f => f.id !== id));
}

function toggleFavorite(track) {
  if (!track?.id) return;
  isFav(track.id) ? removeFavorite(track.id) : addFavorite(track);
}

 const value = useMemo(() => ({
  audioRef,
  current, isPlaying,
  progress, duration,
  volume, setVolume,
  playTrack, togglePlay, seekTo,
  recent,
  favorite, isFav, addFavorite, removeFavorite, toggleFavorite,  
}), [current, isPlaying, progress, duration, volume, recent, favorite]);

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <playerProvider>");
  return ctx;
}
