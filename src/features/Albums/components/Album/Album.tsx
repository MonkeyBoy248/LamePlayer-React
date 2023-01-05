import React from "react";
import styles from './Album.module.scss';
import { Link } from "react-router-dom";
import { AlbumModel } from "@interfaces/Album";

interface AlbumProps {
  album: AlbumModel;
}

const Album = ({ album }: AlbumProps) => {
  return (
    <li className={styles.album}>
        <div className={styles.album__coverWrapper}>
          <Link className={styles.album__inner} to={`/album/${album.id}`}>
            <img className={styles.album__coverImage} src={`/images/covers/${album.coverUrl}`} alt={`${album.title} cover`} />
          </Link>
        </div>
        <div className={styles.album__infoWrapper}>
          <Link className={`${styles.album__title} _itemTitle`} to={`album/${album.id}`}>{album.title}</Link>
          <p className={styles.album__artist}>{album.artist}</p>
        </div>
    </li>
  )
}

export default Album;