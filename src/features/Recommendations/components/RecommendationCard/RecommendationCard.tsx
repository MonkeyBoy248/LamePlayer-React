import React from "react";
import Icon from "../../../../components/Icon";
import { Track } from "../../../../interfaces/TrackInfo";
import { iconIds } from "../../../../utils/config/iconIds";
import styles from './RecommendationCard.module.scss';

interface RecommendationCardProps {
  trackInfo: Track;
}

const RecommendationCard = ({trackInfo}: RecommendationCardProps) => {
  return (
    <div className={styles.recommendationCard}>
      <div className={styles.recommendationCard__inner}>
        <button className={styles.recommendationCard__playButton}>
          <Icon id={iconIds.play} width='2em' height='2em' blockName='recommendationCard' fill='#000000' />
        </button>
        <div className={styles.recommendationCard__trackInfoWrapper}>
          <div className={styles.recommendationCard__trackInfo}>
            <p className={styles.recommendationCard__trackName}>{trackInfo.trackName}</p>
            <p className={styles.recommendationCard__artist}>{trackInfo.artist}</p>
            <p className={styles.recommendationCard__duration}></p>
          </div>
          <div className={styles.recommendationCard__controls}>
            <button className={styles.recommendationCard__addButton}>+</button>
          </div>
        </div>
      </div>
      <audio src={trackInfo.trackSrc} controls={false}></audio>
    </div>
  )
}

export default RecommendationCard;