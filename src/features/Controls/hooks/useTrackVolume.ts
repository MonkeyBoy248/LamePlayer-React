import { MutableRefObject, useState, useEffect, useCallback, useRef } from 'react';

interface UseTrackVolume {
  volume: number;
  setTrackVolume: (e: Event, value: number | number[]) => void;
  muteTrack: () => void;
}

export const useTrackVolume = (audioRef: MutableRefObject<HTMLAudioElement>): UseTrackVolume => {
  const [volume, setVolume] = useState<number>(50);
  const lastVolumeValue = useRef<number>(50);
  const isMuted = useRef<boolean>(false);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [audioRef, volume]);

  const setTrackVolume = useCallback((e: Event, value: number | number[]): void => {
    const trackVolume = Array.isArray(value) ? value[0] : value;

    setVolume(trackVolume);
    lastVolumeValue.current = trackVolume;
  }, []);

  const muteTrack = useCallback((): void => {
    isMuted.current = !isMuted.current;

    if (!isMuted.current) {
      setVolume(lastVolumeValue.current);

      return;
    }

    setVolume(0);
  }, []);

  return {
    volume,
    setTrackVolume,
    muteTrack,
  };
};
