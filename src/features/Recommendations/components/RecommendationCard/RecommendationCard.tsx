import React, { MouseEventHandler } from "react";
import Icon from "@components/Icon";
import { TrackModel } from "@interfaces/Track";
import { iconIds } from "@utils/config/iconIds";
import styles from './RecommendationCard.module.scss';

interface RecommendationCardProps {
  trackInfo: TrackModel;
  dataIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  onClick: (id: string) => void;
}

const RecommendationCard = ({ trackInfo, onClick, isActive, isPlaying }: RecommendationCardProps) => {
  const getPlayButtonIconId = () => {
    if (isActive && isPlaying) {
      return iconIds.pause;
    }

    return iconIds.play
  }

  return (
    <li className={styles.recommendationCard}>
      <div className={styles.recommendationCard__inner} style={{backgroundImage: `url(images/covers/${trackInfo.coverUrl})` }}>
        <button className={styles.recommendationCard__playButton} onClick={() => onClick(trackInfo.id)}>
          <Icon id={getPlayButtonIconId()} width='2em' height='2em' blockName='recommendationCard' fill='#000000' />
        </button>
        <div className={styles.recommendationCard__trackInfoWrapper}>
          <div className={styles.recommendationCard__trackInfo}>
            <p className={styles.recommendationCard__trackName}>{trackInfo.title}</p>
            <p className={styles.recommendationCard__artist}>{trackInfo.artist}</p>
            <p className={styles.recommendationCard__duration}></p>
          </div>
          <div className={styles.recommendationCard__controls}>
            <button className={styles.recommendationCard__addButton}>+</button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default RecommendationCard;