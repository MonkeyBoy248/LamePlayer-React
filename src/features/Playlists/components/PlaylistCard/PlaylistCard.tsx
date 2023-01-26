import styles from './PlaylistCard.module.scss';
import { Link } from 'react-router-dom';
import { PlaylistModel } from "@interfaces/Playlist";
import { getUpdateTime } from '../../helpers/getUpdateTime';

interface PlaylistCardProps {
  playlist: PlaylistModel;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const getTracksAmount = () => {
    const tracksAmount = playlist.tracks.length;

    return tracksAmount === 1 ? `${tracksAmount} track` : `${tracksAmount} tracks`;
  }

  const getPlaylistCover = () => {
    const playlistTracksAmount = playlist.tracks.length;

    if (playlistTracksAmount > 0) {
      return playlist.tracks[playlistTracksAmount - 1].coverUrl;
    }

    return playlist.coverUrl;
  }

  return (
    <li className={styles.playlist}>
      <Link className={styles.playlist__inner} to={`/playlist/${playlist.id}`}>
        <div className={styles.playlist__coverWrapper}>
          <img className={styles.playlist__cover} src={`/images/covers/${getPlaylistCover()}`} alt={`${playlist.name} cover`} />
        </div>
        <h3 className={`${styles.playlist__title} _itemTitle`}>{playlist.name}</h3>
        <p className={`${styles.playlist__tracksAmount} ${styles.playlist__infoText}`}>{getTracksAmount()}</p>
        <p className={`${styles.playlist__updateTime} ${styles.playlist__infoText}`}>{`Last update: ${getUpdateTime(playlist.dateOfUpdate)}`}</p>
      </Link>
    </li>
  )
}

export default PlaylistCard;