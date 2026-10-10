import { useCallback, useEffect, useRef, useState } from "react";

export function useMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    const onReady = () => setAvailable(true);
    const markMissing = () => setAvailable(false);
    audio.addEventListener("canplaythrough", onReady, { once: true });
    audio.addEventListener("loadeddata", onReady, { once: true });
    audio.addEventListener("error", markMissing);
    audio.load();
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.removeEventListener("error", markMissing);
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      await audio.play();
      setPlaying(true);
      setAvailable(true);
      return true;
    } catch {
      setPlaying(false);
      return false;
    }
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;
    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      return;
    }
    await play();
  }, [available, play]);

  return { play, toggle, playing, available };
}
