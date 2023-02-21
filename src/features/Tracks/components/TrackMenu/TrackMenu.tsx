import { AppDispatch } from '@/app/store';
import { MenuItem } from '@/components/MenuItem/MenuItem'
import { StyledMenu } from '@/components/StyledMenu';
import { TrackModel } from '@/interfaces/Track';
import { iconIds } from '@/utils/config/iconIds'
import { useDispatch } from 'react-redux';
import { addToPlaybackQueue } from '../../tracksSlice';
import { AddToPlaylistPopup } from '@/features/Playlists/components/AddToPlaylistPopup/AddToPlaylistPopup';
import { usePopUp } from '@/utils/hooks/usePopUp';

interface TrackContextMenuProps {
  track: TrackModel;
  isOpen: boolean;
  anchorElement: null | HTMLElement;
  onClose: () => void;
}

export const TrackContextMenu = ({ track, isOpen, onClose, anchorElement }: TrackContextMenuProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { isPopUpOpen, closePopUp, showPopUp } = usePopUp();

  const addTrackToPlaybackQueue = () => {
    dispatch(addToPlaybackQueue(track));
    onClose();
  }

  const addTrackToPlaylist = () => {
    showPopUp();
    onClose();
  }

  return (
    <>
      <StyledMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorElement}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      transformOrigin={{vertical: 'bottom', horizontal: 'center'}}
      transitionDuration={0}
      >
      <MenuItem
        iconId={iconIds.playbackQueue}
        title={'Add to playback queue'}
        onClick={() => addTrackToPlaybackQueue()}
      />
      <MenuItem
        iconId={iconIds.add}
        title={'Add to playlist'}
        onClick={() => addTrackToPlaylist()}
      />
      </StyledMenu>
      <AddToPlaylistPopup isOpen={isPopUpOpen} closeModal={closePopUp} trackToAdd={track}/>
    </>
  )
}
