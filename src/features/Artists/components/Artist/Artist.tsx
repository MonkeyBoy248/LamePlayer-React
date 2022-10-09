import React from "react";
import { Link } from "react-router-dom";
import { ArtistModel } from "../../../../interfaces/Artist";
import styles from './Artist.module.scss';

interface ArtistProps {
  artist: ArtistModel;
}

const Artist = ({ artist }: ArtistProps) => {
  return (
    <li className={styles.artist}>
      <Link className={styles.artist__inner} to={`/artist/${artist.id}`}>
        <div className={styles.artist__imageWrapper}>
          <img className={styles.artist__image} src={`/images/artists/${artist.imageUrl}`} alt={`${artist.name}`} />
        </div>
        <div className={styles.artist__infoWrapper}>
          <Link className={`${styles.artist__name} _itemTitle`} to={`artist/${artist.id}`}>{artist.name}</Link>
          <ul className={styles.artist__genres}>
            { artist.genres.map((genre) => {
                return <li className={styles.artist__genre}>
                  <p className={styles.artist__genreName}>{genre}</p>
                </li>
              })
            }
          </ul>
        </div>
      </Link>
    </li>
  )
}

export default Artist;