import { AppDispatch } from '@/app/store';
import { selectPlaybackQueue } from '@/features/Tracks/selectors';
import { setCurrentTrackIndex } from '@/features/Tracks/tracksSlice';
import { TrackModel } from '@/interfaces/Track';
import { getRandomIndex } from '@/utils/helpers/getRandomIndex';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type PlaybackQueueDirection = 'NEXT' | 'PREV';

interface UsePlaybackQueue {
  isLooped: boolean;
  isShuffled: boolean;
  moveToNewTrack: (direction: PlaybackQueueDirection) => void;
  toggleShuffleStatus: () => void;
  toggleLoopStatus: () => void;
}

export const usePlaybackQueue = (currentTrack: TrackModel | null): UsePlaybackQueue => {
  const [isLooped, setIsLooped] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const playbackQueue = useSelector(selectPlaybackQueue);
  const dispatch: AppDispatch = useDispatch();

  const toggleShuffleStatus = useCallback((): void => {
    setIsShuffled((currentValue) => !currentValue);
  }, []);

  const toggleLoopStatus = useCallback((): void => {
    setIsLooped((currentValue) => !currentValue);
  }, []);

  const setRandomTrack = useCallback((): void => {
    const randomTrackIndex = getRandomIndex(playbackQueue);

    dispatch(setCurrentTrackIndex(randomTrackIndex));
  }, [dispatch, playbackQueue]);

  const getTrackIndexBoundry = useCallback(
    (index: number) => {
      if (index === playbackQueue.length) {
        return 0;
      }

      return index;
    },
    [playbackQueue]
  );

  const moveToNewTrack = useCallback(
    (direction: PlaybackQueueDirection) => {
      if (!currentTrack) {
        return;
      }

      if (isShuffled) {
        setRandomTrack();

        return;
      }

      const offset = direction === 'NEXT' ? 1 : -1;
      const currentTrackIndex = playbackQueue.findIndex((track) => track.id === currentTrack.id);
      const newTrackIndex = getTrackIndexBoundry(currentTrackIndex + offset);

      dispatch(setCurrentTrackIndex(newTrackIndex));
    },
    [currentTrack, isShuffled, dispatch, playbackQueue, setRandomTrack, getTrackIndexBoundry]
  );

  return {
    isLooped,
    isShuffled,
    moveToNewTrack,
    toggleShuffleStatus,
    toggleLoopStatus,
  };
};
