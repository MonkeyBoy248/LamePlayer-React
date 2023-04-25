import { FC } from 'react';
import styles from './PlayerControls.module.scss';
import VolumeControls from '../VolumeControls/VolumeControls';
import { TrackProgress } from '../TrackProgress/TrackProgress';
import { useInitAudioControls } from '../../hooks/useInitAudioControls';
import { usePlayCurrentTrack } from '../../hooks/usePlayCurrentTrack';
import { MainControls } from '../MainControls/MainControls';
import { SecondaryControls } from '../SecondaryControls/SecondaryControls';

const PlayerControls: FC = (): JSX.Element => {
  const { currentTrack, isPlaying, audioRef } = useInitAudioControls();

  usePlayCurrentTrack(audioRef, isPlaying, currentTrack);

  return (
    <div className={styles.controls}>
      <TrackProgress audioRef={audioRef} />
      <div className={`${styles.controls__inner} _container`}>
        <MainControls audioRef={audioRef} currentTrack={currentTrack} />
        <div className={styles.controls__secondaryControlsWrapper}>
          {currentTrack && <SecondaryControls audioRef={audioRef} currentTrack={currentTrack} />}
          <VolumeControls audioRef={audioRef} />
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
