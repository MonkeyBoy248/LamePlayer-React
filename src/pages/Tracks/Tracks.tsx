import React from 'react';
import { Page } from '../../interfaces/Page';
import styles from './Tracks.module.scss';
import { tracks } from '../../services/mockDataService';
import TrackList from '../../features/Tracks/components/TrackList/TrackList';

const Tracks = ({ title }: Page) => {
  return (
    <section className={styles.tracks}>
      <h2 className={`${styles.tracks__pageTitle} _pageTitle`}>{title}</h2>
      {
        tracks.length > 0
        ?
        <TrackList tracks={tracks} />
        :
        <p className={styles.tracks__emptyMessage}>The track list is empty.</p>
      }
    </section>

  )
}

export default Tracks;