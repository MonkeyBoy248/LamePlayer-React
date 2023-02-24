import { RootState } from '@/app/store';
import { TrackModel } from '@/interfaces/Track';
import { getRandomTracks } from '@/services/mockDataService';
import RecommendationsList from '@features/Recommendations/components/RecommendationsList/RecommendationsList';
import { Page } from '@interfaces/Page';
import { useState, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';

const Home: FC<Page> = ({ title }: Page): JSX.Element => {
  const tracklist = useSelector((state: RootState) => state.tracks.tracklist);
  const recommendations = useRecommendations(tracklist);

  return (
    <section className={`home _page`}>
      <div className={`home__inner _container`}>
        <h2 className={`home__pageTitle _pageTitle`}>{title}</h2>
        <RecommendationsList recommendationTracks={recommendations} trackList={tracklist} />
      </div>
    </section>
  );
};

const useRecommendations = (tracklist: TrackModel[]): TrackModel[] => {
  const [recommendations, setRecommendations] = useState<TrackModel[]>([]);

  useEffect(() => {
    const randomTracks = getRandomTracks(tracklist);

    setRecommendations(randomTracks);
  }, []);

  return recommendations;
};

export default Home;
