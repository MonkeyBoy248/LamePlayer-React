import { RootState } from '@/app/store';
import { TrackModel } from '@/interfaces/Track';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getTrackFullSrc } from '../helpers/getTrackFullSrc';

export const useInitAudioControls = () => {
  const playlist: TrackModel[] = useSelector((state: RootState) => state.tracks.playlist);
  const currentTrack: TrackModel = useSelector((state: RootState) => playlist[state.tracks.currentTrackIndex]);
  const isPlaying: boolean = useSelector((state: RootState) => state.tracks.isPlaying);
  const audioRef = useRef<HTMLAudioElement>(new Audio(getTrackFullSrc(currentTrack.src)));

  return {
    currentTrack,
    isPlaying,
    audioRef,
    playlist
  }
}