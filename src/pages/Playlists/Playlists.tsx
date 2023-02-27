import PlaylistCards from '@/features/Playlists/components/PlaylistCards/PlaylistCards';
import { Page } from '@interfaces/Page';
import { useSelector } from 'react-redux';
import { selectAllPlaylists } from '@/features/Playlists/selectors';
import { FC } from 'react';

const Playlists: FC<Page> = ({ title }: Page): JSX.Element => {
  const playlists = Object.values(useSelector(selectAllPlaylists));

  return (
    <section className={`playlists _page`}>
      <div className={`playlists__inner _container`}>
        <h2 className={`playlists__title _pageTitle`}>{title}</h2>
        <PlaylistCards playlists={playlists}></PlaylistCards>
      </div>
    </section>
  );
};

export default Playlists;
