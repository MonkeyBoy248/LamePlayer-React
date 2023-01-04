import React from "react";
import Track from "../Track/Track";
import styles from './TrackList.module.scss';
import { TrackModel } from '@interfaces/Track'

interface TrackListProps {
  tracks: TrackModel[];
}

const TrackList = ({ tracks }: TrackListProps) => {
  return (
    <ul className={styles.trackList}>
      { tracks.length > 0 && tracks.map((track: TrackModel) => {
        return <Track track={track}></Track>
      })}
    </ul>
  )
}

export default TrackList;