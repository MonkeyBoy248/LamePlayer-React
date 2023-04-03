import { useDispatch } from 'react-redux';
import { TrackModel } from '@/interfaces/Track';
import { MutableRefObject, useEffect, useRef } from 'react';
import { getTrackFullSrc } from '../helpers/getTrackFullSrc';
import { setIsPlaying } from '@/features/Tracks/tracksSlice';

export const usePlayCurrentTrack = (
  audioRef: MutableRefObject<HTMLAudioElement>,
  isPlaying: boolean,
  currentTrack: TrackModel | null
): void => {
  const dispatch = useDispatch();
  const { id, src } = currentTrack ?? {};
  const isTrackReady = useRef<boolean>(false);
  isTrackReady.current = isPlaying;

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
  }, [isPlaying, audioRef, dispatch]);

  useEffect(() => {
    if (!id || !src) {
      return;
    }

    audioRef.current.src = getTrackFullSrc(src);

    if (!isTrackReady.current) {
      return;
    }

    audioRef.current
      .play()
      .then()
      .catch((e) => {
        console.log(e);
        dispatch(setIsPlaying(false));
      });
  }, [id, src, dispatch, audioRef]);
};
