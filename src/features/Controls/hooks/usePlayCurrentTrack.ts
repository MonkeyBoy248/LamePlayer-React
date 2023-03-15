import { useDispatch } from 'react-redux';
import { TrackModel } from '@/interfaces/Track';
import { MutableRefObject, useEffect } from 'react';
import { getTrackFullSrc } from '../helpers/getTrackFullSrc';
import { setIsPlaying } from '@/features/Tracks/tracksSlice';

export const usePlayCurrentTrack = (
  audioRef: MutableRefObject<HTMLAudioElement>,
  isPlaying: boolean,
  currentTrack: TrackModel | null
): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPlaying) {
      audioRef.current.pause();

      return;
    }

    audioRef.current
      .play()
      .then()
      .catch((e) => {
        console.log(e);
        dispatch(setIsPlaying(false));
      });
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
      .catch((e) => {
        console.log(e);
        dispatch(setIsPlaying(false));
      });
  }, [currentTrack?.id]);
};
