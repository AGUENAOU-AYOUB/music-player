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

  async function playTrack(track) {
    const next = {
      id: track.id,
      title: track.title,
      artist: track.artist?.name,
      cover: track.album?.cover_medium,
      previewUrl: track.preview,
    };
    if (!next.previewUrl) {
      console.warn("no preview URL on this track ");
      return;
    }

    setCurrent(next);

    const audio = audioRef.current;
    audio.src = next.previewUrl;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (e) {
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
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function seekTo(sec) {
    const audio = audioRef.current;
    audio.currentTime = sec;
    setProgress(sec);
  }
  const [volume, setVolume] = useState(1);
  useEffect(()=>{
    audioRef.current.volume = volume
  }, [volume])

  const value = { audioRef,
  current, isPlaying, progress, duration, volume,
  setVolume, playTrack, togglePlay, seekTo};
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <playerProvider>");
  return ctx;
}
