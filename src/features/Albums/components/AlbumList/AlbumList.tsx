import React from "react";
import { AlbumModel } from "@interfaces/Album";
import Album from "../Album/Album";
import styles from './AlbumList.module.scss';

interface AlbumListProps {
  albums: AlbumModel[];
}


const AlbumList = ({ albums }: AlbumListProps) => {
  return (
    <ul className={`${styles.albumList} _grid`}>
      { albums.map((album) => {
        return <Album key={ album.id } album= {album }></Album>
      }) }
    </ul>
  )
}

export default AlbumList;