import { formatTime } from '@/utils/helpers/formatTime';
import { FC, MouseEventHandler } from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import styles from './TrackProgress.module.scss';

interface TrackProgressProps {
  duration: number;
  currentTime: number;
  disabled: boolean;
  onMouseDown: MouseEventHandler<HTMLSpanElement>;
  onChange: ((event: Event, value: number | number[], activeThumb: number) => void) | undefined;
}

const getDuration = (duration: number): string => {
  const totalDuration = duration ?? 0;

  return formatTime(totalDuration);
};

export const TrackProgress: FC<TrackProgressProps> = ({
  duration,
  currentTime,
  disabled,
  onMouseDown,
  onChange,
}: TrackProgressProps): JSX.Element => {
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
        onMouseDown={onMouseDown}
        onChange={onChange}
      ></ProgressBar>
    </div>
  );
};
