import { useCallback, useState } from 'react';
import { useModals } from '@/contexts/ModalsContext';
import { TrackModel } from '@/interfaces/Track';
import { AddToPlaylistPopup } from '../components/AddToPlaylistPopup/AddToPlaylistPopup';

export const useAddToPlaylist = (): ((track: TrackModel) => void) => {
  const { openModal, closeModal } = useModals();
  const [trackToAdd, setTrackToAdd] = useState<TrackModel>({} as TrackModel);

  const addToPlaylist = useCallback((track: TrackModel): void => {
    setTrackToAdd(track);
    openModal(<AddToPlaylistPopup trackToAdd={trackToAdd} closeModal={closeModal} />);
  }, []);

  return addToPlaylist;
};
