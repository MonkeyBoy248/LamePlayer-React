import styles from './RecommendationsList.module.scss';
import { getRecommendations, tracks } from "@services/mockDataService";
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { TrackModel } from "@interfaces/Track";
import { useEffect, useState } from 'react';

const RecommendationsList = () => {
 const recommendations = useRecommendations();

  return (
    <ul className={styles.recommendationsList}>
      {recommendations.length > 0 && recommendations.map((item: TrackModel) => {
        return <RecommendationCard key={item.id} trackInfo={item} />
      })}
    </ul>
  )
}

const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<TrackModel[]>([]);

  useEffect(() => {
    const randomTracks = getRecommendations();

    setRecommendations(randomTracks);
  }, [])

  return recommendations;
}

export default RecommendationsList;