import styles from './RecommendationsList.module.scss';
import RecommendationCard from '../RecommendationCard/RecommendationCard';
import { TrackModel } from '@interfaces/Track';
import { setCurrentTrackIndex, setIsPlaying } from '@/features/Tracks/tracksSlice';
import { AppDispatch } from '@/app/store';
import { useDispatch } from 'react-redux';
import { usePopUp } from '@/utils/hooks/usePopUp';
import { AddToPlaylistPopup } from '@/features/Playlists/components/AddToPlaylistPopup/AddToPlaylistPopup';
import { FC } from 'react';
import { isTrackActive } from '@/features/Tracks/helpers/isTrackActive';
import { useAddToPlaylist } from '@/features/Playlists/hooks/useAddToPlaylist';
import { useInitTrackList } from '@/features/Tracks/hooks/useInitTrackList';

interface RecommendationsListProps {
  recommendationTracks: TrackModel[];
  trackList: TrackModel[];
}

const RecommendationsList: FC<RecommendationsListProps> = ({
  recommendationTracks,
  trackList,
}: RecommendationsListProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { currentTrack, currentTrackIndex, isPlaying } = useInitTrackList();
  const { isPopUpOpen, closePopUp, showPopUp } = usePopUp();
  const { addToPlaylist, trackToAdd } = useAddToPlaylist(showPopUp);

  const setCurrentTrack = (id: string): void => {
    const trackItemIndex = trackList.findIndex((track) => track.id === id);

    if (trackItemIndex === -1) {
      dispatch(setCurrentTrackIndex(0));
    }

    if (currentTrackIndex === trackItemIndex) {
      dispatch(setIsPlaying(!isPlaying));

      return;
    }

    dispatch(setCurrentTrackIndex(trackItemIndex));
  };

  return (
    <>
      <ul className={styles.recommendationsList}>
        {recommendationTracks.length > 0 &&
          recommendationTracks.map((track: TrackModel, index: number) => {
            return (
              <RecommendationCard
                key={track.id}
                isPlaying={isPlaying}
                isActive={isTrackActive(track, currentTrack)}
                dataIndex={index}
                trackInfo={track}
                onPlay={setCurrentTrack}
                onAdd={addToPlaylist}
              />
            );
          })}
      </ul>
      <AddToPlaylistPopup isOpen={isPopUpOpen} trackToAdd={trackToAdd} closeModal={closePopUp} />
    </>
  );
};

export default RecommendationsList;
