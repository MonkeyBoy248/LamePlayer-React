import { FC } from 'react';
import NavItem from '../Navitem/NavItem';
import { NavigationItem } from '@interfaces/NavigationItem';
import styles from './Navigation.module.scss';
import { iconIds } from '@utils/config/iconIds';

const Navigation: FC = (): JSX.Element => {
  const width = '1.5rem';
  const height = '1.5rem';
  const fill = 'var(--controls-svg)';

  const navigationItems: NavigationItem[] = [
    {
      title: 'Home',
      link: '/',
      svg: {
        id: iconIds.home,
        width,
        height,
        fill,
      },
    },
    {
      title: 'Tracks',
      link: 'tracks',
      svg: {
        id: iconIds.tracks,
        width,
        height,
        fill,
      },
    },
    {
      title: 'Artists',
      link: 'artists',
      svg: {
        id: iconIds.artists,
        width,
        height,
        fill,
      },
    },
    {
      title: 'Albums',
      link: 'albums',
      svg: {
        id: iconIds.albums,
        width,
        height,
        fill,
      },
    },
    {
      title: 'Playlists',
      link: 'playlists',
      svg: {
        id: iconIds.playbackQueue,
        width,
        height,
        fill,
      },
    },
    {
      title: 'Settings',
      link: 'settings',
      svg: {
        id: iconIds.settings,
        width,
        height,
        fill,
      },
    },
  ];

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__navList}>
        {navigationItems.length > 0 &&
          navigationItems.map((item) => (
            <NavItem key={item.svg.id} title={item.title} svg={{ ...item.svg }} link={item.link} />
          ))}
      </ul>
    </nav>
  );
};

export default Navigation;
