import { FavoritesButton } from '@/components/FavoritesButton';
import { TrackModel } from '@/interfaces/Track';
import { FC } from 'react';
import styles from './TrackInfo.module.scss';

interface TrackInfoProps {
  currentTrack: TrackModel;
}

export const TrackInfo: FC<TrackInfoProps> = ({ currentTrack }: TrackInfoProps) => {
  return (
    <>
      <div className={styles.trackInfo}>
        <figure className={styles.trackInfo__trackCoverWrapper}>
          <img src={`/images/covers/${currentTrack.coverUrl}`} alt={currentTrack.src} />
        </figure>
        <div className={styles.trackInfo__trackDetails}>
          <p className={`${styles.trackInfo__trackTitle} _text`}>{currentTrack.title}</p>
          <p className={`${styles.trackInfo__artist} _text`}>{currentTrack.artist}</p>
        </div>
      </div>
      <FavoritesButton track={currentTrack} width="2em" height="2em" />
    </>
  );
};
