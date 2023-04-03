import { AppDispatch } from '@/app/store';
import { setCurrentTrackIndex } from '@/features/Tracks/tracksSlice';
import { TrackModel } from '@/interfaces/Track';
import { getRandomIndex } from '@/utils/helpers/getRandomIndex/getRandomIndex';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface UsePlaybackQueue {
  isLooped: boolean;
  isShuffled: boolean;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffleStatus: () => void;
  toggleLoopStatus: () => void;
}

export const usePlaybackQueue = (
  audioRef: MutableRefObject<HTMLAudioElement>,
  playbackQueue: TrackModel[],
  currentTrack: TrackModel | null,
  hasEnded: boolean
): UsePlaybackQueue => {
  const [isLooped, setIsLooped] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
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

  const previousTrack = useCallback((): void => {
    if (!currentTrack) {
      return;
    }

    if (isShuffled) {
      setRandomTrack();

      return;
    }

    const currentTrackIndex = playbackQueue.findIndex((track) => track.id === currentTrack.id);
    const previousTrackIndex = currentTrackIndex - 1;

    dispatch(setCurrentTrackIndex(previousTrackIndex));
  }, [currentTrack, isShuffled, dispatch, playbackQueue, setRandomTrack]);

  const nextTrack = useCallback((): void => {
    if (!currentTrack) {
      return;
    }

    if (isShuffled) {
      setRandomTrack();

      return;
    }

    const currentTrackIndex = playbackQueue.findIndex((track) => track.id === currentTrack.id);
    const nextTrackIndex = currentTrackIndex === playbackQueue.length - 1 ? 0 : currentTrackIndex + 1;

    dispatch(setCurrentTrackIndex(nextTrackIndex));
  }, [currentTrack, isShuffled, dispatch, playbackQueue, setRandomTrack]);

  useEffect(() => {
    if (!hasEnded) {
      return;
    }

    isLooped ? audioRef.current.play().then() : nextTrack();
  }, [hasEnded, isLooped, audioRef, nextTrack]);

  return {
    isLooped,
    isShuffled,
    nextTrack,
    previousTrack,
    toggleShuffleStatus,
    toggleLoopStatus,
  };
};
