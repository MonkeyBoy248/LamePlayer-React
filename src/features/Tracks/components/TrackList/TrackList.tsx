import React, { useState } from "react";
import Track from "../Track/Track";
import styles from './TrackList.module.scss';
import { TrackModel } from '@interfaces/Track'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { setCurrentTrackIndex, setIsPlaying, setPlaybackQueue } from '../../tracksSlice';
import { selectCurrentTrack } from '../../selectors';
import { PlaylistPopup } from '@/features/Playlists/components/PlaylistPopup/PlaylistPopup';
import { useModal } from '@/utils/hooks/useModal';

interface TrackListProps {
  tracks: TrackModel[];
}

const TrackList = ({tracks}: TrackListProps) => {
  const dispatch: AppDispatch = useDispatch();
  const currentTrackIndex = useSelector((state: RootState) => state.tracks.currentTrackIndex);
  const currentTrack = useSelector(selectCurrentTrack);
  const isPlaying = useSelector((state: RootState) => state.tracks.isPlaying);
  const { isOpen, closeModal, openModal } = useModal();
  const [trackToAdd, setTrackToAdd] = useState<TrackModel>({} as TrackModel);

  const setCurrentTrack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const trackItemIndex = Number(e.currentTarget.dataset.index);
    dispatch(setPlaybackQueue(tracks));

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
      <ul className={styles.trackList}>
      { tracks.map((track: TrackModel, index: number) => {
        return <Track
          track={track}
          isActive={currentTrack.id === track.id}
          dataIndex={index}
          key={track.id}
          isPlaying={isPlaying}
          onPlay={setCurrentTrack}
          onAddToPlaylist={addToPlaylist}
          />
      })}
    </ul>
    <PlaylistPopup
      isOpen={isOpen}
      trackToAdd={trackToAdd}
      closeModal={closeModal}
    />
    </>
  )
}

export default TrackList;