import styles from './Playlist.module.scss';
import { Link } from 'react-router-dom';
import { PlaylistModel } from "@interfaces/Playlist";

interface PlaylistProps {
  playlist: PlaylistModel;
}

const Playlist = ({ playlist }: PlaylistProps) => {
  const getTracksAmount = () => {
    const tracksAmount = playlist.tracks.length;

    return tracksAmount === 1 ? `${tracksAmount} track` : `${tracksAmount} tracks`;
  }

  const getPlaylistCover = () => {
    if (playlist.coverUrl) {
      return playlist.coverUrl;
    }

    const playlistTracksAmount = playlist.tracks.length;

    if (playlistTracksAmount > 0) {
      return playlist.tracks[playlistTracksAmount - 1].coverUrl;
    }

    return 'favorites-placeholder.jpg';
  }

  return (
    <li className={styles.playlist}>
      <Link className={styles.playlist__inner} to={`/playlist/${playlist.id}`}>
        <div className={styles.playlist__coverWrapper}>
          <img className={styles.playlist__cover} src={`/images/covers/${getPlaylistCover()}`} alt={`${playlist.name} cover`} />
        </div>
        <h3 className={`${styles.playlist__title} _itemTitle`}>{playlist.name}</h3>
        <p className={styles.playlist__tracksAmount}>{getTracksAmount()}</p>
      </Link>
    </li>
  )
}

export default Playlist;