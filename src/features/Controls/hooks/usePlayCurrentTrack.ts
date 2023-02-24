import { TrackModel } from '@/interfaces/Track';
import { MutableRefObject, useEffect } from 'react';
import { getTrackFullSrc } from '../helpers/getTrackFullSrc';

export const usePlayCurrentTrack = (
  audioRef: MutableRefObject<HTMLAudioElement>,
  isPlaying: boolean,
  currentTrack: TrackModel | null
): void => {
  useEffect(() => {
    if (!isPlaying) {
      audioRef.current.pause();

      return;
    }

    audioRef.current
      .play()
      .then()
      .catch((e) => console.log(e));
  }, [isPlaying, audioRef]);

  useEffect(() => {
    if (!currentTrack) {
      return;
    }

    audioRef.current.src = getTrackFullSrc(currentTrack.src);

    if (!isPlaying) {
      return;
    }

    audioRef.current
      .play()
      .then()
      .catch((e) => console.log(e));
  }, [currentTrack?.id]);
};
