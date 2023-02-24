import PlayLists from '@features/Playlists/components/PlayLists/PlayLists';
import { Page } from '@interfaces/Page';
import { useSelector } from 'react-redux';
import { selectAllPlaylists } from '@/features/Playlists/selectors';
import { FC } from 'react';

const PlaylistsPage: FC<Page> = ({ title }: Page): JSX.Element => {
  const playlists = Object.values(useSelector(selectAllPlaylists));

  return (
    <section className={`playlistsPage _page`}>
      <div className={`playlistsPage__inner _container`}>
        <h2 className={`playlistsPage__title _pageTitle`}>{title}</h2>
        <PlayLists playlists={playlists}></PlayLists>
      </div>
    </section>
  );
};

export default PlaylistsPage;
