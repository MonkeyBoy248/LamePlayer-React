import React from 'react';
import styles from './Tracks.module.scss';
import TrackList from "@features/Tracks/components/TrackList/TrackList";
import { TrackModel } from '@interfaces/Track';

interface TracksProps {
  title: string;
  tracks: TrackModel[];
}

const Tracks = ({ title, tracks }: TracksProps ) => {
  return (
    <section className={styles.tracks}>
      <div className={`${styles.tracks__inner} _container`}>
        <h2 className={`${styles.tracks__pageTitle} _pageTitle`}>{title}</h2>
        {
          tracks.length > 0
          ?
          <TrackList tracks={tracks} />
          :
          <p className={styles.tracks__emptyMessage}>The track list is empty.</p>
        }
      </div>
    </section>

  )
}

export default Tracks;