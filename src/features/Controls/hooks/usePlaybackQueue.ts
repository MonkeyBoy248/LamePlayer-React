import { AppDispatch } from '@/app/store';
import { setCurrentTrackIndex } from '@/features/Tracks/tracksSlice';
import { TrackModel } from '@/interfaces/Track';
import { getRandomIndex } from '@/utils/helpers/getRandomIndex';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const usePlaybackQueue = (audioRef: MutableRefObject<HTMLAudioElement>, playlist: TrackModel[], currentTrack: TrackModel, hasEnded: boolean) => {
  const [isLooped, setIsLooped] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!hasEnded) {
      return;
    }

    isLooped ? audioRef.current.play().then() : nextTrack();
  }, [hasEnded]);

  const toggleShuffleStatus = useCallback((): void => {
    setIsShuffled((currentValue) => !currentValue);
  }, []);

  const toggleLoopStatus = useCallback((): void => {
    setIsLooped((currentValue) => !currentValue);
  }, []);

  const previousTrack = useCallback((): void => {
    if (isShuffled) {
      setRandomTrack();

      return;
    }

    const currentTrackIndex = playlist.findIndex((track) => track.id === currentTrack.id);
    const previousTrackIndex = currentTrackIndex - 1;

    dispatch(setCurrentTrackIndex(previousTrackIndex));
  }, [isShuffled, playlist, currentTrack]);

  const nextTrack = useCallback((): void => {
    if (isShuffled) {
      setRandomTrack();

      return;
    }

    const currentTrackIndex = playlist.findIndex((track) => track.id === currentTrack.id);
    const nextTrackIndex = currentTrackIndex === playlist.length - 1 ? 0 : currentTrackIndex + 1;

    dispatch(setCurrentTrackIndex(nextTrackIndex));
  }, [isShuffled, playlist, currentTrack]);

  const setRandomTrack = (): void => {
    const randomTrackIndex = getRandomIndex(playlist);

    dispatch(setCurrentTrackIndex(randomTrackIndex));
  }

  return {
    isLooped,
    isShuffled,
    nextTrack,
    previousTrack,
    toggleShuffleStatus,
    toggleLoopStatus
  }
}