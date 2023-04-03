import { AppDispatch } from '@/app/store';
import { setIsPlaying } from '@/features/Tracks/tracksSlice';
import { formatTime } from '@/utils/helpers/formatTime/formatTime';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTrackProgress } from '../../hooks/useTrackProgress';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import styles from './TrackProgress.module.scss';

interface TrackProgressProps {
  duration: number;
  currentTime: number;
  disabled: boolean;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
}

const getDuration = (duration: number): string => {
  const totalDuration = duration ?? 0;

  return formatTime(totalDuration);
};

export const TrackProgress: FC<TrackProgressProps> = ({
  duration,
  currentTime,
  disabled,
  audioRef,
}: TrackProgressProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { setTrackCurrentTime } = useTrackProgress(audioRef);

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
        disabled={disabled}
        max={duration}
        value={currentTime}
        onMouseDown={pauseAudioWhileDragging}
        onChange={setProgressBarValueAsAudioCurrentTime}
      ></ProgressBar>
    </div>
  );
};
