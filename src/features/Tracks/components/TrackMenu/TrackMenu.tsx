import { AppDispatch } from '@/app/store';
import { MenuItem } from '@/components/MenuItem/MenuItem';
import { StyledMenu } from '@/components/StyledMenu';
import { TrackModel } from '@/interfaces/Track';
import { iconIds } from '@/utils/config/iconIds';
import { useDispatch } from 'react-redux';
import { addToPlaybackQueue } from '../../tracksSlice';
import { AddToPlaylistPopup } from '@/features/Playlists/components/AddToPlaylistPopup/AddToPlaylistPopup';
import { FC } from 'react';
import { useModals } from '@/contexts/ModalsContext';

interface TrackContextMenuProps {
  track: TrackModel | null;
  isOpen: boolean;
  anchorElement: null | HTMLElement;
  onClose: () => void;
}

export const TrackContextMenu: FC<TrackContextMenuProps> = ({
  track,
  isOpen,
  onClose,
  anchorElement,
}: TrackContextMenuProps): JSX.Element | null => {
  const dispatch: AppDispatch = useDispatch();
  const { openModal, closeModal } = useModals();

  if (!track) {
    return null;
  }

  const addTrackToPlaybackQueue = (): void => {
    dispatch(addToPlaybackQueue(track));
    onClose();
  };

  const addTrackToPlaylist = (): void => {
    openModal(<AddToPlaylistPopup closeModal={closeModal} trackToAdd={track} />);
    onClose();
  };

  if (!track) {
    return null;
  }

  return (
    <>
      <StyledMenu
        open={isOpen}
        onClose={onClose}
        anchorEl={anchorElement}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transitionDuration={0}
      >
        <MenuItem iconId={iconIds.playbackQueue} title={'Add to playback queue'} onClick={addTrackToPlaybackQueue} />
        <MenuItem iconId={iconIds.add} title={'Add to playlist'} onClick={addTrackToPlaylist} />
      </StyledMenu>
    </>
  );
};
