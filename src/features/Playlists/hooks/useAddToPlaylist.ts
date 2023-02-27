import { TrackModel } from '@/interfaces/Track';
import { useCallback, useState } from 'react';

interface UseAddToPlaylist {
  trackToAdd: TrackModel;
  addToPlaylist: (track: TrackModel) => void;
}

export const useAddToPlaylist = (showPopUp: () => void): UseAddToPlaylist => {
  const [trackToAdd, setTrackToAdd] = useState<TrackModel>({} as TrackModel);

  const addToPlaylist = useCallback((track: TrackModel): void => {
    setTrackToAdd(track);
    showPopUp();
  }, []);

  return {
    trackToAdd,
    addToPlaylist,
  };
};
