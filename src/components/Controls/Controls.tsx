import React, { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import styles from './Controls.module.scss';
import { iconIds } from '@utils/config/iconIds';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { setIsPlaying, setNewCurrentTrack } from '@features/Tracks/trackSlice';
import { formatTime } from '@/utils/helpers/formatTime';
import { getRandomIndex } from '@/utils/helpers/getRandomIndex';
import { TrackModel } from '@/interfaces/Track';

const getTrackFullSrc = (src: string) => {
  return `tracks/${src}`;
}

const Controls = () => {
  const blockName = 'controls'
  const dispatch: AppDispatch = useDispatch();
  const {
    playlist,
    currentTrack,
    isPlaying,
    audio,
    currentTime,
    duration,
    hasEnded
  } = useInitAudioControls();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isLooped, setIsLooped] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  usePlayCurrentTrack(audio, isPlaying, currentTrack);

  useEffect(() => {
    if (!hasEnded) {
      return;
    }

    isLooped ? audio.play().then() : nextTrack();
  }, [hasEnded])

  const previousTrack = (): void => {
    let currentTrackIndex = playlist.findIndex((track) => track.id === currentTrack.id);

    if (isShuffled) {
      currentTrackIndex = getRandomIndex(playlist);

      setTrackByIndex(currentTrackIndex);

      return;
    }

    const previousTrackIndex = currentTrackIndex - 1;

    setTrackByIndex(previousTrackIndex);
  }

  const nextTrack = (): void => {
    let currentTrackIndex = playlist.findIndex((track) => track.id === currentTrack.id);

    if (isShuffled) {
      currentTrackIndex = getRandomIndex(playlist);

      setTrackByIndex(currentTrackIndex);

      return;
    }

    const nextTrackIndex = currentTrackIndex === playlist.length - 1 ? 0 : currentTrackIndex + 1;

    setTrackByIndex(nextTrackIndex);
  }

  const isDisabled = (disableIndex: number) => {
    const currentTrackIndex = playlist.findIndex((track) => track.id === currentTrack.id);

    return currentTrackIndex === disableIndex;
  }

  const moveToTargetTime = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBarWidth = progressBarRef.current!.clientWidth;
    const xOffset = e.nativeEvent.clientX;
    const widthFraction = xOffset / progressBarWidth;

    audio.currentTime = widthFraction * duration;
  }

  const setTrackByIndex = (index: number) => {
    audio.src = getTrackFullSrc(playlist[index].src);

    dispatch(setNewCurrentTrack(index));
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
           className={styles.controls__repeatButton} onClick={() => setIsLooped(!isLooped)}>
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
          <button className={styles.controls__volumeButton}>
            <Icon id={iconIds.mid} fill='#E5E5E5' width='2.5em' height='2.5em' blockName={blockName}/>
          </button>
          <button className={styles.controls__shuffleButton} onClick={() => setIsShuffled(!isShuffled)}>
            <Icon
              id={iconIds.shuffle}
              fill={ isShuffled ? '#0FA750' : '#E5E5E5'}
              width='2em'
              height='2em'
              blockName={blockName}
              />
          </button>
        </div>
      </div>
    </div>
  )
}

const usePlayCurrentTrack = (
  audio: HTMLAudioElement,
  isPlaying: boolean,
  currentTrack: TrackModel,
) => {
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
    [isPlaying, currentTrack.id]);
}

const useInitAudioControls = () => {
  const playlist = useSelector((state: RootState) => state.tracks.playlist);
  const currentTrack= useSelector((state: RootState) => playlist[state.tracks.currentTrackIndex]);
  const isPlaying = useSelector((state: RootState) => state.tracks.isPlaying);
  const { current: audio } = useRef(new Audio(getTrackFullSrc(currentTrack.src)));
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  const setAudioTimeData = () => {
    setDuration(audio.duration);
    setCurrentTime(audio.currentTime);
  }

  const setTrackCurrentTime = () => {
    setCurrentTime(audio.currentTime);
  }

  const setTrackHasEnded = () => {
    setHasEnded(true);
  };

  useEffect(() => {
    audio.addEventListener('ended', setTrackHasEnded);
    audio.addEventListener('loadedmetadata', setAudioTimeData);
    audio.addEventListener('timeupdate', setTrackCurrentTime);

    return () => {
      audio.removeEventListener('ended', setTrackHasEnded);
      audio.removeEventListener('loadedmetadata', setAudioTimeData);
      audio.removeEventListener('timeupdate', setTrackCurrentTime);
    }
  }, [])

  useEffect(() => {
    if (currentTime !== duration) {
      return;
    }

    setHasEnded(false);
  }, [currentTime, duration])

  return {
    currentTrack,
    isPlaying,
    audio,
    hasEnded,
    currentTime,
    duration,
    playlist
  }
}

export default Controls;