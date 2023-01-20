import React from "react";
import Track from "../Track/Track";
import styles from './TrackList.module.scss';
import { TrackModel } from '@interfaces/Track'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { setCurrentTrackIndex } from '../../trackSlice';

const TrackList = () => {
  const dispatch: AppDispatch = useDispatch();
  const playlist = useSelector((state: RootState) => state.tracks.playlist);

  const setCurrentTrack = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const currentTrackIndex = Number((e.currentTarget as HTMLLIElement).dataset.index);

    dispatch(setCurrentTrackIndex(currentTrackIndex))
  }
  return (
    <ul className={styles.trackList}>
      { playlist.length > 0 && playlist.map((track: TrackModel, index: number) => {
        return <Track track={ track } dataIndex={index} key={ track.id } onClick={setCurrentTrack}></Track>
      })}
    </ul>
  )
}

export default TrackList;