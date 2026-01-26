
import { useState, useEffect, useCallback, useRef } from 'react';

export const useAudioPlayer = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorId, setErrorId] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentId(null);
    };

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleError = () => {
      setErrorId(audio.dataset.id || 'unknown');
      setIsPlaying(false);
      setProgress(0);
      setCurrentId(null);
      // Automatically clear error after 3 seconds
      setTimeout(() => setErrorId(null), 3000);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  const play = useCallback((id: string, src: string) => {
    if (!audioRef.current) return;

    // If same sound is playing, stop it
    if (currentId === id && isPlaying) {
      stop();
      return;
    }

    // Prepare new sound
    audioRef.current.pause();
    audioRef.current.src = src;
    audioRef.current.dataset.id = id;
    setErrorId(null);
    
    audioRef.current.play().then(() => {
      setCurrentId(id);
      setIsPlaying(true);
    }).catch(() => {
      setErrorId(id);
      setTimeout(() => setErrorId(null), 3000);
    });
  }, [currentId, isPlaying]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentId(null);
      setProgress(0);
    }
  }, []);

  return {
    currentId,
    isPlaying,
    progress,
    errorId,
    play,
    stop
  };
};
