import { AppDispatch } from '@/app/store';
import { PlaylistModel } from '@interfaces/Playlist';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPlaylist } from '../../playlistsSlice';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import styles from './PlayLists.module.scss';


interface PlaylistsProps {
  playlists: PlaylistModel[];
  favorites: PlaylistModel;
}

const PlayLists = ({ playlists, favorites }: PlaylistsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const createNewPlaylist = () => {
    const newPlaylist = {
      id: crypto.randomUUID(),
      name: 'New playlist',
      dateOfCreation: Date.now(),
      dateOfUpdate: Date.now(),
      tracks: [],
      coverUrl: 'playlist-placeholder.webp',
      user: 'MonkeyBoy'
    }

    dispatch(createPlaylist(newPlaylist))
    navigate(`/playlist/${newPlaylist.id}`)
  }

  return (
    <ul className={`${styles.playlists} _grid`}>
      <li className={styles.playlists__createPlaylist}>
        <button className={styles.playlists__createPlaylistButton} onClick={createNewPlaylist}>+</button>
      </li>
      <PlaylistCard  playlist={favorites}/>
      { playlists.length > 0 && playlists.map((playlist) => {
        return <PlaylistCard key={playlist.id} playlist={playlist}/>
        })
      }
    </ul>
  )
}

export default PlayLists;
