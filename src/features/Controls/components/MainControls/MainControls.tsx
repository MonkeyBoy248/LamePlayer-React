import { MouseEvent, useCallback } from 'react';
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
import { FavoritesButton } from '@/components/FavoritesButton';
import { IconButton } from '@/components/IconButton';

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
          <IconButton
              className={styles.controls__prevButton}
              iconId={iconIds.prev}
              fill={'#E5E5E5'}
              width='1.5em'
              height='1.5em'
              blockName={blockName}
              isDisabled={!isShuffled && isDisabled(0)}
              onClick={previousTrack}
            />
          <IconButton
              className={styles.controls__playButton}
              iconId={isPlaying ? iconIds.pause : iconIds.play}
              fill='#E5E5E5'
              width='2em'
              height='2em'
              blockName={blockName}
              isDisabled={!isShuffled && isDisabled(playlist.length - 1)}
              onClick={() => dispatch(setIsPlaying(!isPlaying))}
            />
          <IconButton
              className={styles.controls__nextButton}
              iconId={iconIds.next}
              fill={'#E5E5E5'}
              width='1.5em'
              height='1.5em'
              blockName={blockName}
              isDisabled={!isShuffled && isDisabled(playlist.length - 1)}
              onClick={nextTrack}
            />
          <IconButton
              className={styles.controls__repeatButton}
              iconId={ isLooped ? iconIds.repeatOne : iconIds.repeat}
              fill={ isLooped ? '#0FA750' : '#E5E5E5'}
              width='2em'
              height='2em'
              blockName={blockName}
              onClick={toggleLoopStatus}
            />
          <IconButton
              className={styles.controls__playlistsButton}
              iconId={iconIds.playlists}
              fill='#E5E5E5'
              width='2em'
              height='2em'
              blockName={blockName}
              onClick={(e) => console.log(e.target)}
            />
            <div className={styles.controls__trackInfo}>
              <figure className={styles.controls__trackCoverWrapper}>
                <img src={ `images/covers/${currentTrack.coverUrl }` } alt={ currentTrack.src }/>
              </figure>
              <div className={styles.controls__trackDetails}>
                <p className={`${styles.controls__trackTitle} _text`}>{ currentTrack.title }</p>
                <p className={`${styles.controls__artist} _text`}>{ currentTrack.artist }</p>
              </div>
          </div>
          <FavoritesButton
            fill='#E5E5E5'
            width='2em'
            height='2em'
            blockName={blockName}/>
        </div>
        <div className={styles.controls__secondaryControls}>
          <IconButton
            iconId={iconIds.dots}
            fill='#E5E5E5'
            width='2em'
            height='2em'
            blockName={blockName}
            className={styles.controls__optionsButton}
            onClick={(e) => console.log(e.target)} />
          <IconButton
            className={styles.controls__shuffleButton}
            iconId={iconIds.shuffle}
            fill={ isShuffled ? '#0FA750' : '#E5E5E5'}
            width='2em'
            height='2em'
            blockName={blockName}
            onClick={toggleShuffleStatus}
            />
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