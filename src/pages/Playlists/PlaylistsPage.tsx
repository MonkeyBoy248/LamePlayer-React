import PlayLists from "@features/Playlists/components/PlayLists/PlayLists";
import { Page } from "@interfaces/Page";
import styles from './PlaylistsPage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const PlaylistsPage = ({ title }: Page) => {
  const favorites = useSelector((state: RootState) => state.playlists.favorites);
  const playlistsMap = useSelector((state: RootState) => state.playlists.playlists)
  const playlists = Object.values(playlistsMap);

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