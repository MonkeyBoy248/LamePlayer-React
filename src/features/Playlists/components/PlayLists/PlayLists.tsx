import { PlaylistModel } from '@interfaces/Playlist';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import styles from './PlayLists.module.scss';


interface PlaylistsProps {
  playlists: PlaylistModel[];
  favorites: PlaylistModel;
}

const PlayLists = ({ playlists, favorites }: PlaylistsProps) => {
  return (
    <ul className={`${styles.playlists} _grid`}>
      <li className={styles.playlists__createPlaylist}>
        <button className={styles.playlists__createPlaylistButton}>+</button>
      </li>
      <PlaylistCard  playlist={favorites}/>
      { playlists.length > 0 && playlists.map((playlist) => {
        return <PlaylistCard key={playlist.id} playlist={playlist}/>
      }) }
    </ul>
  )
}

export default PlayLists;