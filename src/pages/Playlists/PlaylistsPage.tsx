import PlayLists from "@features/Playlists/components/PlayLists/PlayLists";
import { Page } from "@interfaces/Page";
import styles from './PlaylistsPage.module.scss';
import { useSelector } from 'react-redux';
import { selectFavorites, selectCustomPlaylists } from '@/features/Playlists/selectors';

const PlaylistsPage = ({ title }: Page) => {
  const favorites = useSelector(selectFavorites);
  const playlists = Object.values(useSelector(selectCustomPlaylists));

  return (
    <section className={`${styles.playlistsPage} _page`}>
      <div className={`${styles.playlistsPage__inner} _container`}>
        <h2 className={`${styles.playlistsPage__title} _pageTitle`}>{title}</h2>
        <PlayLists playlists={playlists} favorites={favorites}></PlayLists>
      </div>
    </section>
  )
}

export default PlaylistsPage;