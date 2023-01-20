import { useCallback } from 'react';
import Icon from '@components/Icon';
import styles from './MainControls.module.scss';
import { iconIds } from '@utils/config/iconIds';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { setIsPlaying } from '@features/Tracks/trackSlice';
import VolumeControls from '../VolumeControls/VolumeControls';
import { TrackProgress } from '../TrackProgress/TrackProgress';
import { useInitAudioControls } from '../../hooks/useInitAudioControls';
import { usePlaybackQueue } from '../../hooks/usePlaybackQueue';
import { usePlayCurrentTrack } from '../../hooks/usePlayCurrentTrack';
import { useTrackProgress } from '../../hooks/useTrackProgress';
import { useTrackVolume } from '../../hooks/useTrackVolume';

const MainControls = () => {
  const blockName = 'controls'
  const dispatch: AppDispatch = useDispatch();
  const {
    playlist,
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
  } = usePlaybackQueue(audioRef, playlist, currentTrack, hasEnded);
  const {
    volume,
    setTrackVolume,
    muteTrack
  } = useTrackVolume(audioRef);

  usePlayCurrentTrack(audioRef, isPlaying, currentTrack);

  const isDisabled = (disableIndex: number): boolean => {
    const currentTrackIndex = playlist.findIndex((track) => track.id === currentTrack.id);

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

  return (
    <div className={styles.controls}>
      <TrackProgress
        duration={duration}
        currentTime={currentTime}
        onMouseDown={pauseAudioWhileDragging}
        onChange={setProgressBarValueAsAudioCurrentTime}
      />
      <div className={`${styles.controls__inner} _container`}>
        <div className={styles.controls__mainControls}>
          <button className={styles.controls__prevButton}
                  disabled={!isShuffled && isDisabled(0)}
                  onClick={previousTrack}
          >
            <Icon id={iconIds.prev} width='1.5em' height='1.5em' blockName={blockName} fill='#E5E5E5'/>
          </button>
          <button
            className={styles.controls__playButton}
            onClick={() => dispatch(setIsPlaying(!isPlaying))}
          >
            <Icon id={isPlaying ? iconIds.pause : iconIds.play} width='2em' height='2em' blockName={blockName} fill='#E5E5E5' />
          </button>
          <button className={styles.controls__nextButton}
                  disabled={!isShuffled && isDisabled(playlist.length - 1)}
                  onClick={nextTrack}
          >
            <Icon id={iconIds.next} width='1.5em' height='1.5em' blockName={blockName} fill='#E5E5E5'/>
          </button>
          <button
           className={styles.controls__repeatButton} onClick={toggleLoopStatus}>
            {
              isLooped ?
                <Icon id={iconIds.repeatOne} fill='#0FA750' width='2em' height='2em' blockName={blockName}/>
                : <Icon id={iconIds.repeat} fill='#E5E5E5' width='2em' height='2em' blockName={blockName}/>
            }
          </button>
          <button className={styles.controls__playlistsButton}>
            <Icon id={iconIds.playlists} fill='#E5E5E5' width='2em' height='2em' blockName={blockName}/>
          </button>
            <div className={styles.controls__trackInfo}>
            <figure className={styles.controls__trackCoverWrapper}>
              <img src={ `images/covers/${currentTrack.coverUrl }` } alt={ currentTrack.src }/>
            </figure>
            <div className={styles.controls__trackDetails}>
              <p className={`${styles.controls__trackTitle} _text`}>{ currentTrack.title }</p>
              <p className={`${styles.controls__artist} _text`}>{ currentTrack.artist }</p>
            </div>
          </div>
        </div>
        <div className={styles.controls__secondaryControls}>
          <button className={styles.controls__optionsButton}>
            <Icon id={iconIds.dots} fill='#E5E5E5' width='2em' height='2em' blockName={blockName}/>
          </button>
          <button className={styles.controls__shuffleButton} onClick={toggleShuffleStatus}>
            <Icon
              id={iconIds.shuffle}
              fill={ isShuffled ? '#0FA750' : '#E5E5E5'}
              width='2em'
              height='2em'
              blockName={blockName}
              />
          </button>
          <VolumeControls
            volume={volume}
            onChange={setTrackVolume}
            onClick={muteTrack}
          />
        </div>
      </div>
    </div>
  )
}

export default MainControls;