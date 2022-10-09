import React from "react";
import Icon from "../../../../components/Icon";
import { TrackModel } from "../../../../interfaces/Track";
import { iconIds } from "../../../../utils/config/iconIds";
import styles from './RecommendationCard.module.scss';

interface RecommendationCardProps {
  trackInfo: TrackModel;
}

const RecommendationCard = ({trackInfo}: RecommendationCardProps) => {
  return (
    <li className={styles.recommendationCard}>
      <div className={styles.recommendationCard__inner} style={{backgroundImage: `url(/images/covers/${trackInfo.coverUrl})` }}>
        <button className={styles.recommendationCard__playButton}>
          <Icon id={iconIds.play} width='2em' height='2em' blockName='recommendationCard' fill='#000000' />
        </button>
        <div className={styles.recommendationCard__trackInfoWrapper}>
          <div className={styles.recommendationCard__trackInfo}>
            <p className={styles.recommendationCard__trackName}>{trackInfo.name}</p>
            <p className={styles.recommendationCard__artist}>{trackInfo.artist}</p>
            <p className={styles.recommendationCard__duration}></p>
          </div>
          <div className={styles.recommendationCard__controls}>
            <button className={styles.recommendationCard__addButton}>+</button>
          </div>
        </div>
      </div>
      <audio src={trackInfo.src} controls={false}></audio>
    </li>
  )
}

export default RecommendationCard;