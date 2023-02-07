import PlayLists from "@features/Playlists/components/PlayLists/PlayLists";
import { Page } from "@interfaces/Page";
import styles from './PlaylistsPage.module.scss';
import { useSelector } from 'react-redux';
import { selectAllPlaylists } from '@/features/Playlists/selectors';

const PlaylistsPage = ({ title }: Page) => {
  const playlists = Object.values(useSelector(selectAllPlaylists));

  return (
    <section className={`${styles.playlistsPage} _page`}>
      <div className={`${styles.playlistsPage__inner} _container`}>
        <h2 className={`${styles.playlistsPage__title} _pageTitle`}>{title}</h2>
        <PlayLists playlists={playlists}></PlayLists>
      </div>
    </section>
  )
}

export default PlaylistsPage;