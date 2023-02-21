import { useCallback } from 'react';
import styles from './MainControls.module.scss';
import { iconIds } from '@utils/config/iconIds';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { setIsPlaying } from '@/features/Tracks/tracksSlice';
import VolumeControls from '../VolumeControls/VolumeControls';
import { TrackProgress } from '../TrackProgress/TrackProgress';
import { useInitAudioControls } from '../../hooks/useInitAudioControls';
import { usePlaybackQueue } from '../../hooks/usePlaybackQueue';
import { usePlayCurrentTrack } from '../../hooks/usePlayCurrentTrack';
import { useTrackProgress } from '../../hooks/useTrackProgress';
import { useTrackVolume } from '../../hooks/useTrackVolume';
import { FavoritesButton } from '@/components/FavoritesButton';
import { IconButton } from '@/components/IconButton/IconButton';
import { TrackContextMenu } from '@/features/Tracks/components/TrackMenu/TrackMenu';
import { useMenu } from '@/utils/hooks/useMenu';
import { usePopUp } from '@/utils/hooks/usePopUp';
import { PlaybackQueuePopUp } from '@/features/Tracks/components/PlaybackQueuePopUp/PlaybackQueuePopUp';

const MainControls = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    playbackQueue,
    currentTrack,
    isPlaying,
    audioRef
  } = useInitAudioControls();
  const {
    currentTime,
    duration,
    hasEnded,
    setTrackCurrentTime,
    setTrackTimeData,
    setTrackHasEnded
  } = useTrackProgress(audioRef);
  const {
    isLooped,
    isShuffled,
    nextTrack,
    previousTrack,
    toggleShuffleStatus,
    toggleLoopStatus
  } = usePlaybackQueue(audioRef, playbackQueue, currentTrack, hasEnded);
  const {
    volume,
    setTrackVolume,
    muteTrack
  } = useTrackVolume(audioRef);
  const { isMenuOpen, anchorElement, setAnchor, closeMenu, toggleMenu } = useMenu<HTMLButtonElement>();
  const { isPopUpOpen, showPopUp, closePopUp } = usePopUp();

  usePlayCurrentTrack(audioRef, isPlaying, currentTrack);

  const isDisabled = (disableIndex: number): boolean => {
    if (!currentTrack) {
      return true;
    }

    const currentTrackIndex = playbackQueue.findIndex((track) => track.id === currentTrack.id);

    return currentTrackIndex === disableIndex;
  }

  const pauseAudioWhileDragging = useCallback((): void => {
    dispatch(setIsPlaying(false));

    document.addEventListener('mouseup', () => {
      dispatch(setIsPlaying(true));
    }, { once: true })
  }, [])

  const setProgressBarValueAsAudioCurrentTime = useCallback((e: Event, value: number | number[]): void => {
    const rangeValue = Array.isArray(value) ? value[0] : value;

    audioRef.current.currentTime = rangeValue;

    setTrackCurrentTime(rangeValue);
  }, []);

  const showTrackMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
    toggleMenu()
  }

  return (
    <div className={styles.controls}>
      <TrackProgress
        disabled={!currentTrack}
        duration={duration}
        currentTime={currentTime}
        onMouseDown={pauseAudioWhileDragging}
        onChange={setProgressBarValueAsAudioCurrentTime}
      />
      <div className={`${styles.controls__inner} _container`}>
        <div className={styles.controls__mainControls}>
          <IconButton
              className={styles.controls__prevButton}
              iconId={iconIds.prev}
              fill={'var(--controls-svg)'}
              width='1.5em'
              height='1.5em'
              isDisabled={!isShuffled && isDisabled(0)}
              onClick={previousTrack}
            />
          <IconButton
              className={styles.controls__playButton}
              iconId={isPlaying ? iconIds.pause : iconIds.play}
              fill='var(--controls-svg)'
              width='2em'
              height='2em'
              isDisabled={playbackQueue.length === 0}
              onClick={() => dispatch(setIsPlaying(!isPlaying))}
            />
          <IconButton
              className={styles.controls__nextButton}
              iconId={iconIds.next}
              fill={'var(--controls-svg)'}
              width='1.5em'
              height='1.5em'
              isDisabled={!isShuffled && isDisabled(playbackQueue.length - 1)}
              onClick={nextTrack}
            />
          {
            currentTrack &&
              <>
                <IconButton
                  className={styles.controls__repeatButton}
                  iconId={ isLooped ? iconIds.repeatOne : iconIds.repeat}
                  fill={ isLooped ? 'var(--accent)' : 'var(--controls-svg)'}
                  width='2em'
                  height='2em'
                  onClick={toggleLoopStatus}
                />
                <IconButton
                    className={styles.controls__playbackQueue}
                    iconId={iconIds.playbackQueue}
                    fill='var(--controls-svg)'
                    width='2em'
                    height='2em'
                    onClick={showPopUp}
                />
                <div className={styles.controls__trackInfo}>
                  <figure className={styles.controls__trackCoverWrapper}>
                    <img src={`/images/covers/${currentTrack.coverUrl }`} alt={ currentTrack.src }/>
                  </figure>
                  <div className={styles.controls__trackDetails}>
                    <p className={`${styles.controls__trackTitle} _text`}>{ currentTrack.title }</p>
                    <p className={`${styles.controls__artist} _text`}>{ currentTrack.artist }</p>
                  </div>
              </div>
              <FavoritesButton
                track={currentTrack}
                width='2em'
                height='2em'
              />
            </>
          }
        </div>
        {
          currentTrack &&
          <div className={styles.controls__secondaryControls}>
            <IconButton
              iconId={iconIds.dots}
              fill='var(--controls-svg)'
              width='2em'
              height='2em'
              className={`controls__optionsButton`}
              onClick={showTrackMenu} />
            <IconButton
              className={styles.controls__shuffleButton}
              iconId={iconIds.shuffle}
              fill={ isShuffled ? 'var(--accent)' : 'var(--controls-svg)'}
              width='2em'
              height='2em'
              onClick={toggleShuffleStatus}
              />
            <VolumeControls
              volume={volume}
              onChange={setTrackVolume}
              onClick={muteTrack}
            />
          </div>
        }
      </div>
      <PlaybackQueuePopUp isOpen={isPopUpOpen} closePopUp={closePopUp} />
      <TrackContextMenu
        anchorElement={anchorElement}
        onClose={closeMenu}
        track={currentTrack!}
        isOpen={isMenuOpen}
      />
    </div>
  )
}

export default MainControls;