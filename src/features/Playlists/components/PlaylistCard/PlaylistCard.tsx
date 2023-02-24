import styles from './PlaylistCard.module.scss';
import { Link } from 'react-router-dom';
import { PlaylistModel } from '@interfaces/Playlist';
import { getUpdateTime } from '../../helpers/getUpdateTime';
import { getTracksAmount } from '../../helpers/getTracksAmount';
import { FC } from 'react';

interface PlaylistCardProps {
  playlist: PlaylistModel;
}

const PlaylistCard: FC<PlaylistCardProps> = ({ playlist }: PlaylistCardProps): JSX.Element => {
  return (
    <li className={styles.playlistCard}>
      <Link className={styles.playlistCard__inner} to={`/playlist/${playlist.id}`}>
        <div className={styles.playlistCard__coverWrapper}>
          <img
            className={styles.playlistCard__cover}
            src={`/images/covers/${playlist.coverUrl}`}
            alt={`${playlist.title} cover`}
          />
        </div>
      </Link>
      <Link to={`/playlist/${playlist.id}`} className={`${styles.playlistCard__title} _itemTitle`}>
        {playlist.title}
      </Link>
      <p className={`${styles.playlistCard__tracksAmount} ${styles.playlistCard__infoText}`}>
        {getTracksAmount(playlist)}
      </p>
      <p
        className={`${styles.playlistCard__updateTime} ${styles.playlistCard__infoText}`}
      >{`Last update: ${getUpdateTime(playlist.dateOfUpdate)}`}</p>
    </li>
  );
};

export default PlaylistCard;
