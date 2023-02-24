import { TrackModel } from '@/interfaces/Track';
import { MutableRefObject, useEffect } from 'react';
import { getTrackFullSrc } from '../helpers/getTrackFullSrc';

export const usePlayCurrentTrack = (
  audio: MutableRefObject<HTMLAudioElement>,
  isPlaying: boolean,
  currentTrack: TrackModel | null
): void => {
  useEffect(() => {
    if (!isPlaying) {
      audio.current.pause();

      return;
    }

    audio.current
      .play()
      .then()
      .catch((e) => console.log(e));
  }, [isPlaying]);

  useEffect(() => {
    if (!currentTrack) {
      return;
    }

    audio.current.src = getTrackFullSrc(currentTrack.src);

    if (!isPlaying) {
      return;
    }

    audio.current
      .play()
      .then()
      .catch((e) => console.log(e));
  }, [currentTrack?.id]);
};
