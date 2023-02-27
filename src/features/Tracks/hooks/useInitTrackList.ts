import { RootState } from '@/app/store';
import { TrackModel } from '@/interfaces/Track';
import { useSelector } from 'react-redux';
import { selectCurrentTrack } from '../selectors';

interface UseInitTrackList {
  currentTrack: TrackModel | null;
  currentTrackIndex: number;
  isPlaying: boolean;
}

export const useInitTrackList = (): UseInitTrackList => {
  const currentTrackIndex = useSelector((state: RootState) => state.tracks.currentTrackIndex);
  const currentTrack = useSelector(selectCurrentTrack);
  const isPlaying = useSelector((state: RootState) => state.tracks.isPlaying);

  return {
    currentTrack,
    currentTrackIndex,
    isPlaying,
  };
};