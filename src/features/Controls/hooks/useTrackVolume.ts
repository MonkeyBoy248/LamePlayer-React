import { MutableRefObject, useState, useEffect, useCallback } from 'react';

export const useTrackVolume = (audioRef: MutableRefObject<HTMLAudioElement>) => {
  const [volume, setVolume] = useState<number>(50);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [lastVolumeValue, setLastVolumeValue] = useState<number>(50);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume])

  useEffect(() => {
    if (!isMuted) {
      setVolume(lastVolumeValue);

      return;
    }

    setVolume(0);
  }, [isMuted])

  const setTrackVolume = useCallback((e: Event, value: number | number[]): void => {
    const trackVolume = Array.isArray(value) ? value[0] : value;

    setVolume(trackVolume);
    setLastVolumeValue(trackVolume);
  }, [])

  const muteTrack = useCallback((): void => setIsMuted((currentValue) => !currentValue), [])

  return {
    volume,
    lastVolumeValue,
    isMuted,
    setTrackVolume,
    muteTrack
  }
}