import { TrackModel } from '@/interfaces/Track';
import { MutableRefObject, useEffect } from 'react';
import { getTrackFullSrc } from '../helpers/getTrackFullSrc';

export const usePlayCurrentTrack = (
  audio: MutableRefObject<HTMLAudioElement>,
  isPlaying: boolean,
  currentTrack: TrackModel,
) => {
  useEffect(() => {
    if (!isPlaying) {
      audio.current.pause();

      return;
    }

    audio.current.play().then();
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    
    audio.current.src = getTrackFullSrc(currentTrack.src);

    audio.current.play().then;
  }, [currentTrack.id])
}