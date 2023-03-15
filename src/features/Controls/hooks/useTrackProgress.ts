import { useEventListener } from '@/utils/hooks/useEventListener';
import { MutableRefObject, useCallback, useRef, useState } from 'react';

interface UseTrackProgress {
  currentTime: number;
  duration: number;
  hasEnded: MutableRefObject<boolean>;
  setTrackCurrentTime: (trackCurrentTime: number) => void;
  setTrackTimeData: () => void;
  setTrackHasEnded: (trackHasEnded: boolean) => void;
}

export const useTrackProgress = (audioRef: MutableRefObject<HTMLAudioElement>): UseTrackProgress => {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const hasEnded = useRef<boolean>(false);

  const setTrackTimeData = useCallback((): void => {
    setDuration(audioRef.current.duration);
    setCurrentTime(audioRef.current.currentTime);
  }, [audioRef]);

  const setTrackCurrentTime = useCallback((trackCurrentTime: number): void => {
    setCurrentTime(trackCurrentTime);
  }, []);

  const setTrackHasEnded = useCallback((trackHasEnded: boolean): void => {
    hasEnded.current = trackHasEnded;
  }, []);

  useEventListener(audioRef, 'loadedmetadata', setTrackTimeData);
  useEventListener(audioRef, 'timeupdate', () => {
    hasEnded.current = audioRef.current.ended;
    setTrackCurrentTime(audioRef.current.currentTime);
  });

  return {
    currentTime,
    duration,
    hasEnded,
    setTrackCurrentTime,
    setTrackTimeData,
    setTrackHasEnded,
  };
};
