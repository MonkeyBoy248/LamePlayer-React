import React, { FC } from 'react';
import { AlbumModel } from '@interfaces/Album';
import Album from '../Album/Album';
import styles from './AlbumList.module.scss';

interface AlbumListProps {
  albums: AlbumModel[];
}

const AlbumList: FC<AlbumListProps> = ({ albums }: AlbumListProps): JSX.Element => {
  return (
    <ul className={`${styles.albumList} _grid`}>
      {albums.map((album) => {
        return <Album key={album.id} album={album}></Album>;
      })}
    </ul>
  );
};

export default AlbumList;
