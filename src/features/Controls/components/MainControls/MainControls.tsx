import { FavoritesButton } from '@/components/FavoritesButton';
import { iconIds } from '@/utils/config/iconIds';
import styles from './MainControls.module.scss';
import { useInitAudioControls } from '../../hooks/useInitAudioControls';
import { usePopUp } from '@/utils/hooks/usePopUp';
import { usePlaybackQueue } from '../../hooks/usePlaybackQueue';
import { IconButton } from '@/components/IconButton/IconButton';
import { AppDispatch } from '@/app/store';
import { setIsPlaying } from '@/features/Tracks/tracksSlice';
import { useDispatch } from 'react-redux';
import { FC } from 'react';
import { TrackModel } from '@/interfaces/Track';
import { PlaybackQueuePopUp } from '@/features/Tracks/components/PlaybackQueuePopUp/PlaybackQueuePopUp';

interface MainControlsProps {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  currentTrack: TrackModel | null;
}

export const MainControls: FC<MainControlsProps> = ({ audioRef, currentTrack }: MainControlsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { playbackQueue, isPlaying } = useInitAudioControls();
  const { isLooped, isShuffled, nextTrack, previousTrack, toggleLoopStatus } = usePlaybackQueue(audioRef);
  const { isPopUpOpen, closePopUp, showPopUp } = usePopUp();

  const isDisabled = (disableIndex: number): boolean => {
    if (!currentTrack) {
      return true;
    }

    const currentTrackIndex = playbackQueue.findIndex((track) => track.id === currentTrack.id);

    return currentTrackIndex === disableIndex;
  };

  const playTrack = (): void => {
    dispatch(setIsPlaying(!isPlaying));
  };

  return (
    <div className={styles.mainControls}>
      <IconButton
        className={styles.mainControls__prevButton}
        iconId={iconIds.prev}
        fill={'var(--controls-svg)'}
        width="1.5em"
        height="1.5em"
        isDisabled={!isShuffled && isDisabled(0)}
        onClick={previousTrack}
      />
      <IconButton
        className={styles.mainControls__playButton}
        iconId={isPlaying ? iconIds.pause : iconIds.play}
        fill="var(--controls-svg)"
        width="2em"
        height="2em"
        isDisabled={playbackQueue.length === 0}
        onClick={playTrack}
      />
      <IconButton
        className={styles.mainControls__nextButton}
        iconId={iconIds.next}
        fill={'var(--controls-svg)'}
        width="1.5em"
        height="1.5em"
        isDisabled={!isShuffled && isDisabled(playbackQueue.length - 1)}
        onClick={nextTrack}
      />
      {currentTrack && (
        <>
          <IconButton
            className={styles.mainControls__repeatButton}
            iconId={isLooped ? iconIds.repeatOne : iconIds.repeat}
            fill={isLooped ? 'var(--accent)' : 'var(--controls-svg)'}
            width="2em"
            height="2em"
            onClick={toggleLoopStatus}
          />
          <IconButton
            className={styles.mainControls__playbackQueue}
            iconId={iconIds.playbackQueue}
            fill="var(--controls-svg)"
            width="2em"
            height="2em"
            onClick={showPopUp}
          />
          <div className={styles.mainControls__trackInfo}>
            <figure className={styles.mainControls__trackCoverWrapper}>
              <img src={`/images/covers/${currentTrack.coverUrl}`} alt={currentTrack.src} />
            </figure>
            <div className={styles.mainControls__trackDetails}>
              <p className={`${styles.mainControls__trackTitle} _text`}>{currentTrack.title}</p>
              <p className={`${styles.mainControls__artist} _text`}>{currentTrack.artist}</p>
            </div>
          </div>
          <FavoritesButton track={currentTrack} width="2em" height="2em" />
        </>
      )}
      <PlaybackQueuePopUp isOpen={isPopUpOpen} closePopUp={closePopUp} />
    </div>
  );
};
