import { AppDispatch } from '@/app/store';
import { setIsPlaying } from '@/features/Tracks/tracksSlice';
import { formatTime } from '@/utils/helpers/formatTime';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTrackProgress } from '../../hooks/useTrackProgress';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import styles from './TrackProgress.module.scss';
import { TrackModel } from '@/interfaces/Track';

interface TrackProgressProps {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  currentTrack: TrackModel | null;
}

const getDuration = (duration: number): string => {
  const totalDuration = duration ?? 0;

  return formatTime(totalDuration);
};

export const TrackProgress: FC<TrackProgressProps> = ({ audioRef, currentTrack }: TrackProgressProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { currentTime, duration, setTrackCurrentTime } = useTrackProgress(audioRef);

  const pauseAudioWhileDragging = (): void => {
    dispatch(setIsPlaying(false));

    document.addEventListener(
      'mouseup',
      () => {
        dispatch(setIsPlaying(true));
      },
      { once: true }
    );
  };

  const setProgressBarValueAsAudioCurrentTime = (e: Event, value: number | number[]): void => {
    const rangeValue = Array.isArray(value) ? value[0] : value;

    audioRef.current.currentTime = rangeValue;

    setTrackCurrentTime(rangeValue);
  };

  return (
    <div className={styles.progress__container}>
      {
        <div className={styles.progress__timeInfo}>
          <span className={styles.progress__timeLabel}>{formatTime(currentTime)}</span>
          <span className={styles.progress__timeLabel}>{!isNaN(duration) && getDuration(duration)}</span>
        </div>
      }
      <ProgressBar
        min={0}
        disabled={!currentTrack}
        max={duration}
        value={currentTime}
        onMouseDown={pauseAudioWhileDragging}
        onChange={setProgressBarValueAsAudioCurrentTime}
      ></ProgressBar>
    </div>
  );
};
