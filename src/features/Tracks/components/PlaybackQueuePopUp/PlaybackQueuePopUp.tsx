import { AppDispatch } from '@/app/store';
import { EmptyMessage } from '@/components/EmptyMessage/EmptyMessage';
import Icon from '@/components/Icon';
import { IconButton } from '@/components/IconButton/IconButton';
import { addTracksToTheNewPlaylist } from '@/features/Playlists/playlistsSlice';
import { iconIds } from '@/utils/config/iconIds';
import { FC, useState } from 'react';
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

export const PlaybackQueuePopUp: FC<PlaybackQueuePopUpProps> = ({
  isOpen,
  closePopUp,
}: PlaybackQueuePopUpProps): JSX.Element | null => {
  const dispatch: AppDispatch = useDispatch();
  const playbackQueue = useSelector(selectPlaybackQueue);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) {
    document.documentElement.classList.remove('_no-scroll');

    return null;
  }

  document.documentElement.classList.add('_no-scroll');

  if (isSaved) {
    setTimeout(() => setIsSaved(false), 5000);
  }

  const removeTrackFromPlaybackQueue = (trackId: string): void => {
    dispatch(removeFromPlaybackQueue(trackId));
  };

  const displayPopUpContent = (): JSX.Element => {
    if (!playbackQueue.length) {
      return <EmptyMessage title={'Playback queue is empty'} />;
    }

    return (
      <div className={styles.playbackQueuePopUp__tracksWrapper}>
        <TrackList tracks={playbackQueue} onDelete={removeTrackFromPlaybackQueue} />
      </div>
    );
  };

  const clearQueue = (): void => {
    dispatch(clearPlaybackQueue());
  };

  const saveQueueAsPlaylist = (): void => {
    dispatch(addTracksToTheNewPlaylist(playbackQueue));

    if (isSaved) {
      return;
    }

    setIsSaved(true);
  };

  return createPortal(
    <div className={styles.playbackQueuePopUp__page}>
      <div className={styles.playbackQueuePopUp__wrapper}>
        <header className={styles.playbackQueuePopUp__header}>
          <div className={styles.playbackQueuePopUp__headerInner}>
            <h2 className={`${styles.playbackQueuePopUp__title} _sectionTitle`}>Playback queue</h2>
            <div className={styles.playbackQueuePopUp__controls}>
              <button onClick={clearQueue} disabled={playbackQueue.length === 0}>
                Clear
              </button>
              <span className={styles.playbackQueuePopUp__saveAsPlaylistWrapper}>
                <button onClick={saveQueueAsPlaylist} disabled={playbackQueue.length === 0}>
                  Save as playlist
                </button>
                {isSaved && (
                  <span className={styles.playbackQueuePopUp__notification}>
                    <Icon id={iconIds.checkmark} width={'1rem'} height={'1rem'} fill={'var(--checkmark)'} />
                  </span>
                )}
              </span>
            </div>
            <IconButton
              iconId={iconIds.close}
              width={'2.5rem'}
              height={'2.5rem'}
              onClick={closePopUp}
              stroke={'var(--controls-svg)'}
              className={styles.playbackQueuePopUp__closeButton}
            />
          </div>
        </header>
        <div className={styles.playbackQueuePopUp__content}>{displayPopUpContent()}</div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};
