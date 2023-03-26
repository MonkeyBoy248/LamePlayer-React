import { useCallback } from 'react';
import { useModals } from '@/contexts/ModalsContext';
import { TrackModel } from '@/interfaces/Track';
import { AddToPlaylistPopup } from '../components/AddToPlaylistPopup/AddToPlaylistPopup';

export const useAddToPlaylist = (): ((track: TrackModel) => void) => {
  const { openModal, closeModal } = useModals();

  const addToPlaylist = useCallback((track: TrackModel): void => {
    openModal(<AddToPlaylistPopup trackToAdd={track} closeModal={closeModal} />);
  }, []);

  return addToPlaylist;
};
