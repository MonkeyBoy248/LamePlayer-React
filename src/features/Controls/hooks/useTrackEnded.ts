import { MutableRefObject, useCallback, useEffect } from 'react';
import { useEventListener } from '@/utils/hooks/useEventListener';
import { usePlaybackQueue } from './usePlaybackQueue';
import { TrackModel } from '@/interfaces/Track';
import { useDispatch, useSelector } from 'react-redux';
import { setlectHasEnded } from '@/features/Tracks/selectors';
import { AppDispatch } from '@/app/store';
import { setHasEnded } from '@/features/Tracks/tracksSlice';

export const useTrackEnded = (currentTrack: TrackModel | null, audioRef: MutableRefObject<HTMLAudioElement>): void => {
  const dispatch: AppDispatch = useDispatch();
  const hasEnded = useSelector(setlectHasEnded);
  const { moveToNewTrack, isLooped } = usePlaybackQueue(currentTrack);

  const trackEndsHandler = useCallback(() => {
    dispatch(setHasEnded(true));
  }, [dispatch]);

  useEventListener(audioRef, 'ended', trackEndsHandler);

  useEffect(() => {
    if (!hasEnded) {
      return;
    }

    isLooped ? audioRef.current.play().then() : moveToNewTrack('NEXT');
  }, [hasEnded, isLooped, audioRef, moveToNewTrack]);
};
