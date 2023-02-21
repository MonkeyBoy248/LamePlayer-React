import { AppDispatch } from '@/app/store';
import { EmptyMessage } from '@/components/EmptyMessage/EmptyMessage';
import { IconButton } from '@/components/IconButton/IconButton';
import { addTracksToTheNewPlaylist } from '@/features/Playlists/playlistsSlice';
import { iconIds } from '@/utils/config/iconIds';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlaybackQueue } from '../../selectors';
import { clearPlaybackQueue, removeFromPlaybackQueue } from '../../tracksSlice';
import TrackList from '../TrackList/TrackList';
import styles from './PlaybackQueuePopUp.module.scss';

interface PlaybackQueuePopUpProps {
  isOpen: boolean;
  closePopUp: () => void;
}

export const PlaybackQueuePopUp = ({ isOpen, closePopUp }: PlaybackQueuePopUpProps) => {
  const dispatch: AppDispatch = useDispatch();
  const playbackQueue = useSelector(selectPlaybackQueue);

  if (!isOpen) {
    document.documentElement.classList.remove('_no-scroll');
    
    return null;
  }

  document.documentElement.classList.add('_no-scroll');

  const removeTrackFromPlaybackQueue = (trackId: string) => {
    dispatch(removeFromPlaybackQueue(trackId));
  }

  const displayPopUpContent = () => {
    if (!playbackQueue.length) {
      return <EmptyMessage title={'Playback queue is empty'}/>
    }

    return <div className={styles.playbackQueuePopUp__tracksWrapper}>
          <TrackList
            tracks={playbackQueue}
            onDelete={removeTrackFromPlaybackQueue}
          />
        </div>
  }

  const saveQueueAsPlaylist = () => {
    dispatch(addTracksToTheNewPlaylist(playbackQueue))
  }

  return createPortal(
    <div className={styles.playbackQueuePopUp__page}>
       <div className={styles.playbackQueuePopUp__wrapper}>
      <header className={styles.playbackQueuePopUp__header}>
        <div className={styles.playbackQueuePopUp__headerInner}>
          <h2 className={`${styles.playbackQueuePopUp__title} _sectionTitle`}>Playback queue</h2>
            <div className={styles.playbackQueuePopUp__controls}>
              <button onClick={() => dispatch(clearPlaybackQueue())} disabled={playbackQueue.length === 0}>
                Clear
              </button>
              <button onClick={() => saveQueueAsPlaylist()} disabled={playbackQueue.length === 0}>Save as playlist</button>
            </div>
            <IconButton
            iconId={iconIds.close}
            width={'2.5rem'}
            height={'2.5rem'}
            onClick={() => {console.log('clicked');
              closePopUp();
            }}
            stroke={'var(--controls-svg)'}
            className={styles.playbackQueuePopUp__closeButton}
            />
        </div>
      </header>
      <div className={styles.playbackQueuePopUp__content}>
        { displayPopUpContent() }
      </div>
    </div>
    </div>,
    document.getElementById('portal')!
  )
}
