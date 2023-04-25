import { iconIds } from '@/utils/config/iconIds';
import { FC } from 'react';
import styles from './VolumeControls.module.scss';
import { VolumeSlider } from '../VolumeSlider/VolumeSlider';
import { IconButton } from '@/components/IconButton/IconButton';
import { useTrackVolume } from '../../hooks/useTrackVolume';

interface VolumeControlsProps {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
}

export const VolumeControls: FC<VolumeControlsProps> = ({ audioRef }: VolumeControlsProps): JSX.Element => {
  const { volume, setTrackVolume, muteTrack } = useTrackVolume(audioRef);

  const getVolumeIcon = (): string => {
    switch (true) {
      case volume === 0:
        return iconIds.mute;
      case volume > 50:
        return iconIds.full;
      default:
        return iconIds.mid;
    }
  };

  return (
    <div className={styles.volume__container}>
      <div className={styles.volume__sliderContainer}>
        <VolumeSlider
          size="medium"
          max={100}
          min={0}
          value={volume}
          valueLabelDisplay="auto"
          onChange={setTrackVolume}
        ></VolumeSlider>
      </div>
      <IconButton
        iconId={getVolumeIcon()}
        fill="var(--controls-svg)"
        width="2.5em"
        height="2.5em"
        className={styles.controls__volumeButton}
        onClick={muteTrack}
      />
    </div>
  );
};

export default VolumeControls;
