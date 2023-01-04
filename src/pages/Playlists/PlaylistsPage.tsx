import React from "react";
import PlayLists from "@features/Playlists/components/PlayLists/PlayLists";
import { Page } from "@interfaces/Page";
import styles from './PlaylistsPage.module.scss';
import { playlists } from "@services/mockDataService";

const PlaylistsPage = ({ title }: Page) => {
  return (
    <section className={styles.playlistsPage}>
      <div className={`${styles.playlistsPage__inner} _container`}>
        <h2 className={`${styles.playlistsPage__title} _pageTitle`}>{title}</h2>
        {playlists.length > 0
        ?
        <PlayLists playlists={playlists}></PlayLists>
        :
        <p>No playlist was found</p>
        }
      </div>
    </section>
  )
}

export default PlaylistsPage;