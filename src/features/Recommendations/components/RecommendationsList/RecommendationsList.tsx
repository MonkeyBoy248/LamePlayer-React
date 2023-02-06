import styles from './RecommendationsList.module.scss';
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { TrackModel } from "@interfaces/Track";
import { setCurrentTrackIndex, setIsPlaying } from '@/features/Tracks/tracksSlice';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTrack } from '@/features/Tracks/selectors';
import { useModal } from '@/utils/hooks/useModal';
import { AddToPlaylistPopup } from '@/features/Playlists/components/AddToPlaylistPopup/AddToPlaylistPopup';
import { useState } from 'react';

interface RecommendationsListProps {
  recommendationTracks: TrackModel[];
  trackList: TrackModel[];
}

const RecommendationsList = ({ recommendationTracks, trackList }: RecommendationsListProps) => {
  const dispatch: AppDispatch = useDispatch();
  const currentTrackIndex = useSelector((state: RootState) => state.tracks.currentTrackIndex);
  const currentTrack = useSelector(selectCurrentTrack);
  const isPlaying = useSelector((state: RootState) => state.tracks.isPlaying);
  const { openModal, isOpen, closeModal } = useModal();
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
    openModal();
  }

  return (
    <>
    <ul className={styles.recommendationsList}>
      {recommendationTracks.length > 0 && recommendationTracks.map((item: TrackModel, index: number) => {
        return <RecommendationCard
          key={item.id}
          isPlaying={isPlaying}
          isActive={item.id === currentTrack.id}
          dataIndex={index}
          trackInfo={item}
          onPlay={setCurrentTrack}
          onAdd={addToPlaylist}
          />
      })}
    </ul>
    <AddToPlaylistPopup
      isOpen={isOpen}
      trackToAdd={trackToAdd}
      closeModal={closeModal}
    />
    </>
  )
}

export default RecommendationsList;
