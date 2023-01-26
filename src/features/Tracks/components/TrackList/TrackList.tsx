import React from "react";
import Track from "../Track/Track";
import styles from './TrackList.module.scss';
import { TrackModel } from '@interfaces/Track'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { setCurrentTrackIndex, setIsPlaying } from '../../tracksSlice';

interface TrackListProps {
  tracks: TrackModel[];
}

const TrackList = ({tracks}: TrackListProps) => {
  const dispatch: AppDispatch = useDispatch();
  const currentTrackIndex = useSelector((state: RootState) => state.tracks.currentTrackIndex);
  const isPlaying = useSelector((state: RootState) => state.tracks.isPlaying);

  const setCurrentTrack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const trackItemIndex = Number(e.currentTarget.dataset.index);

    if (currentTrackIndex === trackItemIndex) {
      dispatch(setIsPlaying(!isPlaying));

      return;
    }

    dispatch(setCurrentTrackIndex(trackItemIndex));
  }

  return (
    <ul className={styles.trackList}>
      { tracks.map((track: TrackModel, index: number) => {
        return <Track
          track={track}
          isActive={index === currentTrackIndex}
          dataIndex={index}
          key={track.id}
          isPlaying={isPlaying}
          onClick={setCurrentTrack}
          />
      })}
    </ul>
  )
}

export default TrackList;