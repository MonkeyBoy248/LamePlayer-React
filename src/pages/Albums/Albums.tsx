import React from "react";
import AlbumList from "../../features/Albums/components/AlbumList/AlbumList";
import { Page } from "../../interfaces/Page";
import { albums } from "../../services/mockDataService";
import styles from './Albums.module.scss';

const Albums = ({ title }: Page) => {
  return (
    <section className={styles.albums}>
      <div className={`${styles.albums__inner} _container`}>
        <h2 className={`${styles.albums__pageTitle} _pageTitle`}>{title}</h2>
        { albums.length > 0 ?
        <AlbumList albums={albums} /> :
        <p>Albums list is empty</p>
        }
      </div>
    </section>
  )
}

export default Albums;