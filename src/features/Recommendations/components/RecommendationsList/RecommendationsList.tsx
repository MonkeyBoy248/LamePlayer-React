import React from "react";
import styles from './RecommendationsList.module.scss';
import { tracks } from "../../../../services/mockDataService";
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { TrackData } from "../../../../interfaces/Track";
import { v4 as uuidv4 } from 'uuid';


const RecommendationsList = () => {
  const mockRecommendations = tracks.slice(12, 15);

  return (
    <ul className={styles.recommendationsList}>
      {mockRecommendations.length > 0 && mockRecommendations.map((item: TrackData) => {
        return <RecommendationCard key={item.id} trackInfo={item} />
      })}
    </ul>
  )
}

export default RecommendationsList;