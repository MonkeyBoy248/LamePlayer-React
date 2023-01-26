import { selectAllTracks, selectCurrentTrack, selectPlayingStatus } from '@/features/Tracks/selectors';
import { TrackModel } from '@/interfaces/Track';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getTrackFullSrc } from '../helpers/getTrackFullSrc';

export const useInitAudioControls = () => {
  const playlist: TrackModel[] = useSelector(selectAllTracks);
  const currentTrack: TrackModel = useSelector(selectCurrentTrack);
  const isPlaying: boolean = useSelector(selectPlayingStatus);
  const audioRef = useRef<HTMLAudioElement>(new Audio(getTrackFullSrc(currentTrack.src)));

  return {
    currentTrack,
    isPlaying,
    audioRef,
    playlist
  }
}