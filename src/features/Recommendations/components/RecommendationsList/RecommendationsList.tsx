import React from "react";
import styles from './RecommendationsList.module.scss';
import { mockTracks } from "../../../../services/mockDataService";
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { Track } from "../../../../interfaces/TrackInfo";
import { v4 as uuidv4 } from 'uuid';


const RecommendationsList = () => {
  const mockRecommendations = mockTracks.slice(12, 15);

  return (
    <div className={styles.recommendationsList}>
      {mockRecommendations.length > 0 && mockRecommendations.map((item: Track) => {
        return <RecommendationCard key={uuidv4()} trackInfo={item} />
      })}
    </div>
  )
}

export default RecommendationsList;