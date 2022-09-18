import React from "react";
import Track from "../Track/Track";
import styles from './TrackList.module.scss';
import { TrackData } from '../../../../interfaces/Track'

interface TrackListProps {
  tracks: TrackData[];
}

const TrackList = ({ tracks }: TrackListProps) => {
  return (
    <ul className={styles.trackList}>
      { tracks.length > 0 && tracks.map((track: TrackData) => {
        return <Track track={track}></Track>
      })}
    </ul>
  )
}

export default TrackList;