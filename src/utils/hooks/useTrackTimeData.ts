import { useEffect, useState } from "react";

export interface TrackTimeData {
  duration: number;
  currentTime: number;
}

export const useTrackTimeData = (audio: HTMLAudioElement): TrackTimeData => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const setAudioTimeData = () => {
    setDuration(audio.duration);
    setCurrentTime(audio.currentTime);
  }

  const setTrackCurrentTime = () => {
    setCurrentTime(audio.currentTime);
  }

  useEffect(() => {
    audio.addEventListener('loadedmetadata', setAudioTimeData);
    audio.addEventListener('timeupdate', setTrackCurrentTime);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioTimeData);
      audio.removeEventListener('timeupdate', setAudioTimeData);
    }

  }, [audio.readyState])

  return { duration, currentTime };
}