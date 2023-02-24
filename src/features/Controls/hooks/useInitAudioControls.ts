import { selectCurrentTrack, selectPlaybackQueue, selectPlayingStatus } from '@/features/Tracks/selectors';
import { TrackModel } from '@/interfaces/Track';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getTrackFullSrc } from '../helpers/getTrackFullSrc';

interface UseInitAudioControls {
  currentTrack: TrackModel | null;
  isPlaying: boolean;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  playbackQueue: TrackModel[];
}

export const useInitAudioControls = (): UseInitAudioControls => {
  const playbackQueue = useSelector(selectPlaybackQueue);
  const currentTrack = useSelector(selectCurrentTrack);
  const isPlaying = useSelector(selectPlayingStatus);
  const audioRef = useRef<HTMLAudioElement>(new Audio(currentTrack ? getTrackFullSrc(currentTrack.src) : undefined));

  return {
    currentTrack,
    isPlaying,
    audioRef,
    playbackQueue,
  };
};
