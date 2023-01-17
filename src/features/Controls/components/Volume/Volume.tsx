import Icon from '@/components/Icon';
import { iconIds } from '@/utils/config/iconIds';
import React, { ChangeEventHandler } from 'react'
import styles from './Volume.module.scss';

export interface VolumeProps {
  volume: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Volume = ({ volume, onChange }: VolumeProps) => {
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
        <input
          className={styles.volume__slider}
          type="range"
          min='0'
          max='100'
          defaultValue={volume}
          onChange={onChange}
           />
      </div>
      <button className={styles.controls__volumeButton}>
        <Icon id={getVolumeIcon()} fill='#E5E5E5' width='2.5em' height='2.5em' blockName={blockName}/>
      </button>
    </div>
  )
}

export default Volume;
