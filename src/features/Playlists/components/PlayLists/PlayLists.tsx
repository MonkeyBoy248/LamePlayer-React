import React from 'react';
import { PlaylistModel } from '../../../../interfaces/Playlist';
import Playlist from '../Playlist/Playlist';
import styles from './PlayLists.module.scss';


interface PlaylistsProps {
  playlists: PlaylistModel[];
}

const PlayLists = ({ playlists }: PlaylistsProps) => {
  return (
    <ul className={styles.playlists}>
      <li className={styles.playlists__createPlaylist}>
        <button className={styles.playlists__createPlaylistButton}>+</button>
      </li>
      { playlists.map((playlist) => <Playlist key={playlist.id} playlist={playlist}/>) }
    </ul>
  )
}

export default PlayLists;