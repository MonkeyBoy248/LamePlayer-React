import Icon from '@/components/Icon';
import { iconIds } from '@/utils/config/iconIds';
import { MouseEventHandler } from 'react'
import styles from './VolumeControls.module.scss';
import { VolumeSlider } from '../VolumeSlider/VolumeSlider';

export interface VolumeProps {
  volume: number;
  onChange: ((event: Event, value: number | number[], activeThumb: number) => void) | undefined;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const VolumeControls = ({ volume, onChange, onClick }: VolumeProps) => {
  const blockName = 'volume';

  const getVolumeIcon = (): string => {
    switch(true) {
      case volume === 0:
        return iconIds.mute;
      case volume > 50:
        return iconIds.full;
      default:
        return iconIds.mid;
    }
  }

  return (
    <div className={styles.volume__container}>
      <div className={styles.volume__sliderContainer}>
          <VolumeSlider
            size='medium'
            max={100}
            min={0}
            value={volume}
            valueLabelDisplay='auto'
            onChange={onChange}
            >
          </VolumeSlider>
      </div>
      <button className={styles.controls__volumeButton} onClick={onClick}>
        <Icon id={getVolumeIcon()} fill='#E5E5E5' width='2.5em' height='2.5em' blockName={blockName}/>
      </button>
    </div>
  )
}

export default VolumeControls;
