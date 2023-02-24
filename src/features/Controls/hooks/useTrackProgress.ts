import { useEventListener } from '@/utils/hooks/useEventListener';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';

interface UseTrackProgress {
  currentTime: number;
  duration: number;
  hasEnded: boolean;
  setTrackCurrentTime: (trackCurrentTime: number) => void;
  setTrackTimeData: () => void;
  setTrackHasEnded: (trackHasEnded: boolean) => void;
}

export const useTrackProgress = (audioRef: MutableRefObject<HTMLAudioElement>): UseTrackProgress => {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  const setTrackTimeData = useCallback((): void => {
    setDuration(audioRef.current.duration);
    setCurrentTime(audioRef.current.currentTime);
  }, [audioRef]);

  const setTrackCurrentTime = useCallback((trackCurrentTime: number): void => {
    setCurrentTime(trackCurrentTime);
  }, []);

  const setTrackHasEnded = useCallback((trackHasEnded: boolean): void => {
    setHasEnded(trackHasEnded);
  }, []);

  useEventListener(audioRef, 'loadedmetadata', setTrackTimeData);
  useEventListener(audioRef, 'ended', () => setTrackHasEnded(true));
  useEventListener(audioRef, 'timeupdate', () => setTrackCurrentTime(audioRef.current.currentTime));

  useEffect(() => {
    if (currentTime !== duration) {
      return;
    }

    setHasEnded(false);
  }, [currentTime, duration]);

  return {
    currentTime,
    duration,
    hasEnded,
    setTrackCurrentTime,
    setTrackTimeData,
    setTrackHasEnded,
  };
};
