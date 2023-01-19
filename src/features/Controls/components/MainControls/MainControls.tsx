import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@components/Icon';
import styles from './MainControls.module.scss';
import { iconIds } from '@utils/config/iconIds';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { setIsPlaying, setNewCurrentTrack } from '@features/Tracks/trackSlice';
import { getRandomIndex } from '@/utils/helpers/getRandomIndex';
import { TrackModel } from '@/interfaces/Track';
import VolumeControls from '../VolumeControls/VolumeControls';
import { TrackProgress } from '../TrackProgress/TrackProgress';
import { useEventListener } from '@/utils/hooks/useEventListener';

const getTrackFullSrc = (src: string) => {
  return `tracks/${src}`;
}

const MainControls = () => {
  const blockName = 'controls'
  const dispatch: AppDispatch = useDispatch();
  const {
    playlist,
    currentTrack,
    isPlaying,
    audio
  } = useInitAudioControls();
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [isLooped, setIsLooped] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [lastVolumeValue, setLastVolumeValue] = useState<number>(50);

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

  usePlayCurrentTrack(audio, isPlaying, currentTrack);
  useEventListener(audio, 'ended', setTrackHasEnded);
  useEventListener(audio, 'loadedmetadata', setAudioTimeData);
  useEventListener(audio,'timeupdate', setTrackCurrentTime);

  useEffect(() => {
    if (!hasEnded) {
      return;
    }

    isLooped ? audio.play().then() : nextTrack();
  }, [hasEnded])

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume])

  useEffect(() => {
    if (!isMuted) {
      setVolume(lastVolumeValue);

      return;
    }

    setVolume(0);
  }, [isMuted])

  useEffect(() => {
    if (currentTime !== duration) {
      return;
    }

    setHasEnded(false);
  }, [currentTime, duration])

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

  const pauseAudioWhileDragging = useCallback(() => {
    dispatch(setIsPlaying(false));

    document.addEventListener('mouseup', () => {
      dispatch(setIsPlaying(true));
    }, { once: true })
  }, [])

  const setAudioCurrentTime = useCallback((e: Event, value: number | number[]) => {
    const rangeValue = Array.isArray(value) ? value[0] : value;

    audio.currentTime = rangeValue;
    setCurrentTime(rangeValue);
  }, []);

  const setTrackByIndex = (index: number) => {
    audio.src = getTrackFullSrc(playlist[index].src);

    dispatch(setNewCurrentTrack(index));
  }

  const setTrackVolume = useCallback((e: Event, value: number | number[]) => {
    const trackVolume = Array.isArray(value) ? value[0] : value;

    setVolume(trackVolume);
    setLastVolumeValue(trackVolume);
  }, [])

  const muteTrack = useCallback(() => setIsMuted(!isMuted), [])

  return (
    <div className={styles.controls}>
      <TrackProgress
        duration={duration}
        currentTime={currentTime}
        onMouseDown={pauseAudioWhileDragging}
        onChange={setAudioCurrentTime}
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
          <button className={styles.controls__shuffleButton} onClick={() => setIsShuffled(!isShuffled)}>
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
  }, [isPlaying, currentTrack.id]);
}

const useInitAudioControls = () => {
  const playlist: TrackModel[] = useSelector((state: RootState) => state.tracks.playlist);
  const currentTrack: TrackModel = useSelector((state: RootState) => playlist[state.tracks.currentTrackIndex]);
  const isPlaying: boolean = useSelector((state: RootState) => state.tracks.isPlaying);
  const { current: audio } = useRef<HTMLAudioElement>(new Audio(getTrackFullSrc(currentTrack.src)));

  return {
    currentTrack,
    isPlaying,
    audio,
    playlist
  }
}

export default MainControls;