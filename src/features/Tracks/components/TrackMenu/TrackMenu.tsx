import { AppDispatch } from '@/app/store';
import { MenuItem } from '@/components/MenuItem/MenuItem'
import { MenuWrapper } from '@/components/MenuWrapper/MenuWrapper'
import { TrackModel } from '@/interfaces/Track';
import { iconIds } from '@/utils/config/iconIds'
import { useDispatch } from 'react-redux';
import { addToPlaybackQueue } from '../../tracksSlice';

interface TrackContextMenuProps {
  track: TrackModel;
  isOpen: boolean;
  onClickOutside: () => void;
}

export const TrackContextMenu = ({ track, isOpen, onClickOutside }: TrackContextMenuProps) => {
  const dispatch: AppDispatch = useDispatch();

  const addTrackToPlaybackQueue = () => {
    dispatch(addToPlaybackQueue(track));
  }

  return (
    <MenuWrapper isOpen={isOpen} placement={'top-end'} onClickOutside={onClickOutside}>
      <MenuItem
        iconId={iconIds.playbackQueue}
        title={'Add to playback queue'}
        onClick={() => addTrackToPlaybackQueue()}
      />
    </MenuWrapper>
  )
}
