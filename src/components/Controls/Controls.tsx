import React, { useEffect, useRef } from 'react';
import Icon from '../Icon';
import styles from './Controls.module.scss';
import { iconIds } from '@utils/config/iconIds';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { setIsPlaying, setNewCurrentTrack } from '@features/Tracks/trackSlice';
import { tracks } from "@services/mockDataService";
import { useTrackTimeData } from "@utils/hooks/useTrackTimeData";
import { formatTime } from '@/utils/helpers/formatTime';

const getTrackFullSrc = (src: string) => {
  return `tracks/${src}`;
}

const Controls = () => {
  const blockName = 'controls'
  const dispatch: AppDispatch = useDispatch();
  const {
    currentTrack,
    isPlaying,
    audio,
    currentTime,
    duration,
  } = usePlayCurrentTrack();
  const progressBarRef = useRef<HTMLDivElement>(null);

  const previousTrack = (): void => {
    const currentSongIndex = tracks.findIndex((track) => track.id === currentTrack.id);
    const previousTrackIndex = currentSongIndex - 1;
    audio.src = getTrackFullSrc(tracks[previousTrackIndex].src);

    dispatch(setNewCurrentTrack(previousTrackIndex));
  }

  const nextTrack = (): void => {
    const currentSongIndex = tracks.findIndex((track) => track.id === currentTrack.id);
    const nextTrackIndex = currentSongIndex + 1;
    audio.src = getTrackFullSrc(tracks[nextTrackIndex].src);

    dispatch(setNewCurrentTrack(nextTrackIndex));
  }

  const isDisabled = (disableIndex: number) => {
    const currentSongIndex = tracks.findIndex((track) => track.id === currentTrack.id);

    return currentSongIndex === disableIndex;
  }

  const moveToTargetTime = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBarWidth = progressBarRef.current!.clientWidth;
    const xOffset = e.nativeEvent.offsetX;
    const widthFraction = xOffset / progressBarWidth;

    audio.currentTime = widthFraction * duration;;
  }

  return (
    <div className={styles.controls}>
      <div className={styles.controls__timeInfo}>
        <span className={styles.controls__timeLabel}>{ formatTime(currentTime) }</span>
        <span className={styles.controls__timeLabel}>{ (duration && !isNaN(duration)) && formatTime(duration) }</span>
      </div>
      <div className={styles.controls__progressBar} ref={progressBarRef} onClick={moveToTargetTime}>
        <div className={styles.controls__progress}
            style={
                { width: currentTime ? `${currentTime / duration * 100}%` : 0 }
              }>
              <div className={styles.controls__progressThumb}></div>
        </div>
      </div>
      <div className={`${styles.controls__inner} _container`}>
        <div className={styles.controls__mainControls}>
          <button className={styles.controls__prevButton}
                  disabled={isDisabled(0)}
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
                  disabled={isDisabled(tracks.length - 1)}
                  onClick={nextTrack}
          >
            <Icon id={iconIds.next} width='1.5em' height='1.5em' blockName={blockName} fill='#E5E5E5'/>
          </button>
          <button className={styles.controls__repeatButton}>
            <Icon id={iconIds.repeat} fill='#E5E5E5' width='1.75em' height='1.75em' blockName={blockName}/>
          </button>
          <button className={styles.controls__playlistsButton}>
            <Icon id={iconIds.playlists} fill='#E5E5E5' width='1.75em' height='1.75em' blockName={blockName}/>
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
          <button className={styles.controls__volumeButton}>
            <Icon id={iconIds.mid} fill='#E5E5E5' width='2.5em' height='2.5em' blockName={blockName}/>
          </button>
          <button className={styles.controls__shuffleButton}>
            <Icon id={iconIds.shuffle} fill='#E5E5E5' width='2em' height='2em' blockName={blockName}/>
          </button>
        </div>
      </div>
    </div>
  )
}

const usePlayCurrentTrack = () => {
  const currentTrack = useSelector((state: RootState) => tracks[state.tracks.currentTrackIndex]);
  const { current: audio } = useRef(new Audio(getTrackFullSrc(currentTrack.src)));
  const isPlaying = useSelector((state: RootState) => state.tracks.isPlaying);
  const { duration, currentTime } = useTrackTimeData(audio);

  useEffect(() => {
      const playCurrentTrack = async () => {
        if (!isPlaying) {
          audio.pause();

          return;
        }

        await audio.play();
      };

      playCurrentTrack().then();
    },
    [isPlaying, currentTrack]);

  return {
    currentTrack,
    isPlaying,
    audio,
    duration,
    currentTime,
  };
}

export default Controls;