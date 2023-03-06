import { IconButton } from '@/components/IconButton/IconButton';
import { TrackModel } from '@interfaces/Track';
import { iconIds } from '@utils/config/iconIds';
import { FC } from 'react';
import styles from './RecommendationCard.module.scss';

interface RecommendationCardProps {
  trackInfo: TrackModel;
  dataIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: (id: string) => void;
  onAdd: (track: TrackModel) => void;
}

const RecommendationCard: FC<RecommendationCardProps> = ({
  trackInfo,
  onPlay,
  isActive,
  isPlaying,
  onAdd,
}: RecommendationCardProps): JSX.Element => {
  const getPlayButtonIconId = (): string => {
    if (isActive && isPlaying) {
      return iconIds.pause;
    }

    return iconIds.play;
  };

  const playTrack = (): void => {
    onPlay(trackInfo.id);
  };

  const addTrackToPlaylist = (): void => {
    onAdd(trackInfo);
  };

  return (
    <li className={styles.recommendationCard}>
      <div
        className={styles.recommendationCard__inner}
        style={{ backgroundImage: `url(images/covers/${trackInfo.coverUrl})` }}
      >
        <IconButton
          iconId={getPlayButtonIconId()}
          className={`${styles.recommendationCard__playButton} _playButton`}
          width={'2em'}
          height={'2em'}
          onClick={playTrack}
        />
        <div className={styles.recommendationCard__trackInfoWrapper}>
          <div className={styles.recommendationCard__trackInfo}>
            <p className={styles.recommendationCard__trackName}>{trackInfo.title}</p>
            <p className={styles.recommendationCard__artist}>{trackInfo.artist}</p>
            <p className={styles.recommendationCard__duration}></p>
          </div>
          <div className={styles.recommendationCard__controls}>
            <IconButton
              className={styles.recommendationCard__addButton}
              iconId={iconIds.add}
              width={'1.5rem'}
              height={'1.5rem'}
              fill={'#E5E5E5'}
              onClick={addTrackToPlaylist}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default RecommendationCard;
