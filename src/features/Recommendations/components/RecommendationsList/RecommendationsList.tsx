import React from "react";
import styles from './RecommendationsList.module.scss';
import { mockTracks } from "../../../../services/mockDataService";
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { Track } from "../../../../interfaces/TrackInfo";

const RecommendationsList = () => {
  const mockRecommendations = mockTracks.slice(9, 12);

  return (
    <div className={styles.recommendationsList}>
      {mockRecommendations.length > 0 && mockRecommendations.map((item: Track) => {
        return <RecommendationCard trackInfo={item} />
      })}
    </div>
  )
}

export default RecommendationsList;