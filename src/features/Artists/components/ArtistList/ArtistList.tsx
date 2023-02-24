import React, { FC } from 'react';
import { ArtistModel } from '@interfaces/Artist';
import styles from './ArtistList.module.scss';
import Artist from '../Artist/Artist';

interface ArtistListProps {
  artists: ArtistModel[];
}

const ArtistList: FC<ArtistListProps> = ({ artists }: ArtistListProps): JSX.Element => {
  return (
    <ul className={`${styles.artistList} _grid`}>
      {artists.map((artist) => {
        return <Artist key={artist.id} artist={artist} />;
      })}
    </ul>
  );
};

export default ArtistList;
