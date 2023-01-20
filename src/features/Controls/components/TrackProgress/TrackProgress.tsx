import { formatTime } from '@/utils/helpers/formatTime';
import { MouseEventHandler } from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import styles from './TrackProgress.module.scss';

interface TrackProgressProps {
  duration: number;
  currentTime: number;
  onMouseDown: MouseEventHandler<HTMLSpanElement>;
  onChange: ((event: Event, value: number | number[], activeThumb: number) => void) | undefined;
}

export const TrackProgress = (
  {
    duration,
    currentTime,
    onMouseDown,
    onChange,
  }: TrackProgressProps
  ) => {
  return (
    <div className={styles.progress__container}>
      <div className={styles.progress__timeInfo}>
        <span className={styles.progress__timeLabel}>{ formatTime(currentTime) }</span>
        <span className={styles.progress__timeLabel}>{ (duration && !isNaN(duration)) && formatTime(duration) }</span>
      </div>
      <ProgressBar
        min={0}
        max={duration}
        value={currentTime}
        onMouseDown={onMouseDown}
        onChange={onChange}
      >
      </ProgressBar>
    </div>
  )
}
