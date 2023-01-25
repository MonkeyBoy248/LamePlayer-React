import { PlaylistModel } from '@interfaces/Playlist';
import Playlist from '../Playlist/Playlist';
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
      <Playlist  playlist={favorites}/>
      { playlists.length > 0 && playlists.map((playlist) => {
        return <Playlist key={playlist.id} playlist={playlist}/>
      }) }
    </ul>
  )
}

export default PlayLists;