import styles from './RecommendationsList.module.scss';
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { TrackModel } from "@interfaces/Track";
import { setCurrentTrackIndex, setIsPlaying } from '@/features/Tracks/trackSlice';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';

interface RecommendationsListProps {
  recommendationTracks: TrackModel[];
  trackList: TrackModel[];
}

const RecommendationsList = ({ recommendationTracks, trackList }: RecommendationsListProps) => {
  const dispatch: AppDispatch = useDispatch();
  const currentTrackIndex = useSelector((state: RootState) => state.tracks.currentTrackIndex);
  const isPlaying = useSelector((state: RootState) => state.tracks.isPlaying);

  const setCurrentTrack = (id: string) => {
    const trackItemIndex = trackList.findIndex((track) => track.id === id);

    if (currentTrackIndex === trackItemIndex) {
      dispatch(setIsPlaying(!isPlaying));

      return;
    }

    dispatch(setCurrentTrackIndex(trackItemIndex));
  }

  const isRecommendationItemActive = (item: TrackModel) => {
    const trackItemIndex = trackList.findIndex((track) => track.id === item.id);

    return currentTrackIndex === trackItemIndex;
  }

  return (
    <ul className={styles.recommendationsList}>
      {recommendationTracks.length > 0 && recommendationTracks.map((item: TrackModel, index: number) => {
        return <RecommendationCard
          key={item.id}
          isPlaying={isPlaying}
          isActive={isRecommendationItemActive(item)}
          dataIndex={index}
          trackInfo={item}
          onClick={setCurrentTrack}
          />
      })}
    </ul>
  )
}

export default RecommendationsList;
