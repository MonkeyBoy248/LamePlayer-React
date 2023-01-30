import { RootState } from '@/app/store';
import TrackList from '@/features/Tracks/components/TrackList/TrackList';
import { TrackModel } from '@/interfaces/Track';
import { getRandomTracks } from '@/services/mockDataService';
import RecommendationsList from "@features/Recommendations/components/RecommendationsList/RecommendationsList";
import { Page } from "@interfaces/Page";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';

const Home = ({ title }: Page) => {
  const tracklist = useSelector((state: RootState) => state.tracks.tracklist);
  const recommendations = useRecommendations(tracklist);

  return (
    <section className={`${styles.home} _page`}>
      <div className={`${styles.home__inner} _container`}>
        <h2 className={`${styles.home__pageTitle} _pageTitle`}>{title}</h2>
        <RecommendationsList recommendationTracks={recommendations} trackList={tracklist} />
      </div>
    </section>
  )
}

const useRecommendations = (tracklist: TrackModel[]) => {
  const [recommendations, setRecommendations] = useState<TrackModel[]>([]);

  useEffect(() => {
    const randomTracks = getRandomTracks(tracklist);

    setRecommendations(randomTracks);
  }, [])

  return recommendations;
}

export default Home;