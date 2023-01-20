import { AppDispatch } from '@/app/store';
import { setNewCurrentTrack } from '@/features/Tracks/trackSlice';
import { TrackModel } from '@/interfaces/Track';
import { getRandomIndex } from '@/utils/helpers/getRandomIndex';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTrackFullSrc } from '../helpers/getTrackFullSrc';

export const usePlaybackQueue = (audioRef: MutableRefObject<HTMLAudioElement>, playlist: TrackModel[], currentTrack: TrackModel, hasEnded: boolean) => {
  const [isLooped, setIsLooped] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!hasEnded) {
      return;
    }

    isLooped ? audioRef.current.play().then() : nextTrack();
  }, [hasEnded])

  const toggleShuffleStatus = useCallback((): void => {
    setIsShuffled((currentValue) => !currentValue);
  }, []);

  const toggleLoopStatus = useCallback((): void => {
    setIsLooped((currentValue) => !currentValue);
  }, []);

  const previousTrack = useCallback((): void => {
    let currentTrackIndex = playlist.findIndex((track) => track.id === currentTrack.id);

    if (isShuffled) {
      currentTrackIndex = getRandomIndex(playlist);

      setTrackByIndex(currentTrackIndex);

      return;
    }

    const previousTrackIndex = currentTrackIndex - 1;

    setTrackByIndex(previousTrackIndex);
  }, [isShuffled, playlist, currentTrack]);

  const nextTrack = useCallback((): void => {
    let currentTrackIndex = playlist.findIndex((track) => track.id === currentTrack.id);

    if (isShuffled) {
      currentTrackIndex = getRandomIndex(playlist);

      setTrackByIndex(currentTrackIndex);

      return;
    }

    const nextTrackIndex = currentTrackIndex === playlist.length - 1 ? 0 : currentTrackIndex + 1;

    setTrackByIndex(nextTrackIndex);
  }, [isShuffled, playlist, currentTrack]);

  const setTrackByIndex = (index: number): void => {
    audioRef.current.src = getTrackFullSrc(playlist[index].src);

    dispatch(setNewCurrentTrack(index));
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