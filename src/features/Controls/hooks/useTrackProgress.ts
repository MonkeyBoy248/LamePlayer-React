import { useEventListener } from '@/utils/hooks/useEventListener';
import { MutableRefObject, useCallback, useState } from 'react';

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

  const timeUpdateHandler = (): void => {
    setTrackHasEnded(audioRef.current.ended);
    setTrackCurrentTime(audioRef.current.currentTime);
  };

  useEventListener(audioRef, 'loadedmetadata', setTrackTimeData);
  useEventListener(audioRef, 'timeupdate', timeUpdateHandler);

  return {
    currentTime,
    duration,
    hasEnded,
    setTrackCurrentTime,
    setTrackTimeData,
    setTrackHasEnded,
  };
};
