import React from "react";
import styles from './Playlist.module.scss';
import { Link } from 'react-router-dom';
import { PlaylistModel } from "../../../../interfaces/Playlist";
import { TrackModel } from "../../../../interfaces/Track";
import Icon from "../../../../components/Icon";
import { iconIds } from "../../../../utils/config/iconIds";

interface PlaylistProps {
  playlist: PlaylistModel;
}

const Playlist = ({ playlist }: PlaylistProps) => {
  const blockName = 'playlist';
  const getTracksAmount = (tracks: TrackModel[]) => {
    const tracksAmount = tracks.length;

    return tracksAmount > 1 ? `${tracksAmount} tracks` : `${tracksAmount} track` ;
  }

  return (
    <li className={styles.playlist}>
      <Link className={styles.playlist__inner} to={`/playlist/${playlist.id}`}>
        <div className={styles.playlist__coverWrapper}>
          <img className={styles.playlist__cover} src={`/images/covers/${playlist.coverUrl}`} alt={`${playlist.name} cover`} />
        </div>
        <h3 className={`${styles.playlist__title} _itemTitle`}>{playlist.name}</h3>
        <p className={styles.playlist__tracksAmount}>{getTracksAmount(playlist.tracks)}</p>
      </Link>
    </li>
  )
}

export default Playlist;