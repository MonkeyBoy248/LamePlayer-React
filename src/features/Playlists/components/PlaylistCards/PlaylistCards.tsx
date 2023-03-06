import { AppDispatch } from '@/app/store';
import { IconButton } from '@/components/IconButton/IconButton';
import { iconIds } from '@/utils/config/iconIds';
import { PlaylistModel } from '@interfaces/Playlist';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPlaylist } from '../../playlistsSlice';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import styles from './PlaylistCards.module.scss';

interface PlaylistsProps {
  playlists: PlaylistModel[];
}

const PlaylistCards: FC<PlaylistsProps> = ({ playlists }: PlaylistsProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const createNewPlaylist = (): void => {
    const newPlaylist: PlaylistModel = {
      id: crypto.randomUUID(),
      title: 'New playlist',
      createdByUser: true,
      dateOfCreation: Date.now(),
      dateOfUpdate: Date.now(),
      tracks: [],
      coverUrl: 'playlist-placeholder.webp',
      user: 'MonkeyBoy',
    };

    dispatch(createPlaylist(newPlaylist));
    navigate(`/playlists/${newPlaylist.id}`);
  };

  return (
    <ul className={`${styles.playlists} _grid`}>
      <li className={styles.playlists__createPlaylist}>
        <button className={styles.playlists__createPlaylistButton} onClick={createNewPlaylist}>
          +
        </button>
      </li>
      {playlists.length > 0 &&
        playlists.map((playlist) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}
    </ul>
  );
};

export default PlaylistCards;
