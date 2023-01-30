import { selectCurrentTrack, selectPlaybackQueue, selectPlayingStatus } from '@/features/Tracks/selectors';
import { TrackModel } from '@/interfaces/Track';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getTrackFullSrc } from '../helpers/getTrackFullSrc';

export const useInitAudioControls = () => {
  const playbackQueue: TrackModel[] = useSelector(selectPlaybackQueue);
  const currentTrack: TrackModel = useSelector(selectCurrentTrack);
  const isPlaying: boolean = useSelector(selectPlayingStatus);
  const audioRef = useRef<HTMLAudioElement>(new Audio(getTrackFullSrc(currentTrack.src)));

  return {
    currentTrack,
    isPlaying,
    audioRef,
    playbackQueue
  }
}