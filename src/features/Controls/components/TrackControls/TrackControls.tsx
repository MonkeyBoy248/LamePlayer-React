import VolumeControls from '../VolumeControls/VolumeControls';
import { TrackModel } from '@/interfaces/Track';
import styles from './TrackControls.module.scss';
import { FC, useEffect } from 'react';
import { MainControls } from '../MainControls/MainControls';
import { SecondaryControls } from '../SecondaryControls/SecondaryControls';
import { usePlaybackQueue } from '../../hooks/usePlaybackQueue';

interface TrackControlsProps {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  currentTrack: TrackModel | null;
}

export const TrackControls: FC<TrackControlsProps> = ({ currentTrack, audioRef }: TrackControlsProps) => {
  const { isShuffled } = usePlaybackQueue(currentTrack);

  return (
    <div className={`${styles.trackControls__wrapper} _container`}>
      <MainControls currentTrack={currentTrack} isShuffled={isShuffled} />
      <div className={styles.trackControls__secondaryControlsWrapper}>
        {currentTrack && <SecondaryControls audioRef={audioRef} currentTrack={currentTrack} isShuffled={isShuffled} />}
      </div>
    </div>
  );
};
