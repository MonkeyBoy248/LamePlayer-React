import { TrackModel } from '@/interfaces/Track';
import { MutableRefObject, useEffect } from 'react';

export const usePlayCurrentTrack = (
  audio: MutableRefObject<HTMLAudioElement>,
  isPlaying: boolean,
  currentTrack: TrackModel,
) => {
  useEffect(() => {
    const playCurrentTrack = async (): Promise<void> => {
      if (!isPlaying) {
        audio.current.pause();

        return;
      }

      await audio.current.play();
    };

    playCurrentTrack().then();
  }, [isPlaying, currentTrack.id]);
}