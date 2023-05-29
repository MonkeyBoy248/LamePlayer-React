import { FC, useEffect } from 'react';
import styles from './PlayerControls.module.scss';
import { TrackProgress } from '../TrackProgress/TrackProgress';
import { useInitAudioControls } from '../../hooks/useInitAudioControls';
import { TrackControls } from '../TrackControls/TrackControls';
import { usePlayCurrentTrack } from '../../hooks/usePlayCurrentTrack';
import { useTrackEnded } from '../../hooks/useTrackEnded';

const PlayerControls: FC = (): JSX.Element => {
  const { currentTrack, isPlaying, audioRef } = useInitAudioControls();

  useTrackEnded(currentTrack, audioRef);
  usePlayCurrentTrack(audioRef, isPlaying, currentTrack);

  return (
    <div className={styles.controls}>
      <TrackProgress audioRef={audioRef} currentTrack={currentTrack} />
      <TrackControls audioRef={audioRef} currentTrack={currentTrack} />
    </div>
  );
};

export default PlayerControls;
