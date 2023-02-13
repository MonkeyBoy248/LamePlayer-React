import { AppDispatch } from '@/app/store';
import { ContextMenuItem } from '@/components/ContextMenuItem/ContextMenuItem'
import { ContextMenuWrapper } from '@/components/ContextMenuWrapper/ContextMenuWrapper'
import { TrackModel } from '@/interfaces/Track';
import { iconIds } from '@/utils/config/iconIds'
import { useDispatch } from 'react-redux';
import { addToPlaybackQueue } from '../../tracksSlice';

interface TrackContextMenuProps {
  track: TrackModel;
  isOpen: boolean;
}

export const TrackContextMenu = ({ track, isOpen }: TrackContextMenuProps) => {
  const dispatch: AppDispatch = useDispatch();

  const addTrackToPlaybackQueue = () => {
    dispatch(addToPlaybackQueue(track));
  }

  return (
    <ContextMenuWrapper isOpen={isOpen} placement={'top-end'}>
      <ContextMenuItem
        iconId={iconIds.playbackQueue}
        title={'Add to playback queue'}
        onClick={() => addTrackToPlaybackQueue()}
      />
    </ContextMenuWrapper>
  )
}
