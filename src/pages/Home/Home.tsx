import { RootState } from '@/app/store';
import { TrackModel } from '@/interfaces/Track';
import { getRecommendations } from '@/services/mockDataService';
import RecommendationsList from "@features/Recommendations/components/RecommendationsList/RecommendationsList";
import { Page } from "@interfaces/Page";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';

const Home = ({ title }: Page) => {
  const recommendations = useRecommendations();
  const trackList = useSelector((state: RootState) => state.tracks.playlist);

  return (
    <section className={styles.home}>
      <div className={`${styles.home__inner} _container`}>
        <h2 className={`${styles.home__pageTitle} _pageTitle`}>{title}</h2>
        <RecommendationsList recommendationTracks={recommendations} trackList={trackList} />
      </div>
    </section>
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

export default Home;