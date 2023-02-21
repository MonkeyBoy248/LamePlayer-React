import styles from './RecommendationsList.module.scss';
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { TrackModel } from "@interfaces/Track";
import { setCurrentTrackIndex, setIsPlaying } from '@/features/Tracks/tracksSlice';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTrack } from '@/features/Tracks/selectors';
import { usePopUp } from '@/utils/hooks/usePopUp';
import { AddToPlaylistPopup } from '@/features/Playlists/components/AddToPlaylistPopup/AddToPlaylistPopup';
import { useState } from 'react';
import { isTrackActive } from '@/features/Tracks/helpers/isTrackActive';

interface RecommendationsListProps {
  recommendationTracks: TrackModel[];
  trackList: TrackModel[];
}

const RecommendationsList = ({ recommendationTracks, trackList }: RecommendationsListProps) => {
  const dispatch: AppDispatch = useDispatch();
  const currentTrackIndex = useSelector((state: RootState) => state.tracks.currentTrackIndex);
  const currentTrack = useSelector(selectCurrentTrack);
  const isPlaying = useSelector((state: RootState) => state.tracks.isPlaying);
  const { showPopUp, isPopUpOpen, closePopUp } = usePopUp();
  const [trackToAdd, setTrackToAdd] = useState<TrackModel>({} as TrackModel);

  const setCurrentTrack = (id: string) => {
    const trackItemIndex = trackList.findIndex((track) => track.id === id);

    if (trackItemIndex === -1) {
      dispatch(setCurrentTrackIndex(0));
    }

    if (currentTrackIndex === trackItemIndex) {
      dispatch(setIsPlaying(!isPlaying));

      return;
    }

    dispatch(setCurrentTrackIndex(trackItemIndex));
  }

  const addToPlaylist = (track: TrackModel) => {
    setTrackToAdd(track);
    showPopUp();
  }

  return (
    <>
    <ul className={styles.recommendationsList}>
      {recommendationTracks.length > 0 && recommendationTracks.map((track: TrackModel, index: number) => {
        return <RecommendationCard
          key={track.id}
          isPlaying={isPlaying}
          isActive={isTrackActive(track, currentTrack)}
          dataIndex={index}
          trackInfo={track}
          onPlay={setCurrentTrack}
          onAdd={addToPlaylist}
          />
      })}
    </ul>
    <AddToPlaylistPopup
      isOpen={isPopUpOpen}
      trackToAdd={trackToAdd}
      closeModal={closePopUp}
    />
    </>
  )
}

export default RecommendationsList;
