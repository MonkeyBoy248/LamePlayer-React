import React from "react";
import styles from './Album.module.scss';
import { Link } from "react-router-dom";
import { AlbumModel } from "../../../../interfaces/Album";

interface AlbumProps {
  album: AlbumModel;
}

const Album = ({ album }: AlbumProps) => {
  return (
    <li className={styles.album}>
      <div className={styles.album__inner}>
        <img src={`/images/covers/${album.cover}`} alt={`${album.title} cover`} />
        <div className={styles.album__infoWrapper}>
          <Link className={styles.album__title} to={`album/${album.id}`}>{album.title}</Link>
          <p className={styles.album__artist}>{album.artist}</p>
        </div>
      </div>
    </li>
  )
}

export default Album;