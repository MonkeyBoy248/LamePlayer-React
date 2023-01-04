import React from 'react';
import NavItem from '../Navitem/NavItem';
import { NavigationItem } from '@interfaces/NavigationItem';
import styles from './Navigation.module.scss';
import { iconIds } from '@utils/config/iconIds';

const Navigation = () => {
  const blockName = 'navItem';
  const width = '1.5em';
  const height = '1.5em';
  const fill = '#E5E5E5';

  const navigationItems: NavigationItem[] = [
    {
      title: 'Tracks',
      svg: {
        id: iconIds.tracks,
        width,
        height,
        fill,
        blockName,
      }
    },
    {
      title: 'Artists',
      svg: {
        id: iconIds.artists,
        width,
        height,
        fill,
        blockName,
      }
    },
    {
      title: 'Albums',
      svg: {
        id: iconIds.albums,
        width,
        height,
        fill,
        blockName,
      }
    },
    {
      title: 'Playlists',
      svg: {
        id: iconIds.playlists,
        width,
        height,
        fill,
        blockName,
      }
    },
    {
      title: 'Settings',
      svg: {
        id: iconIds.settings,
        width,
        height,
        fill,
        blockName,
      }
    }
  ]

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__navList}>
        { navigationItems.length > 0 && navigationItems.map((item) =>
          <NavItem key={item.svg.id} title={item.title} svg={{...item.svg}} />
        )}
      </ul>
    </nav>
  )
}

export default Navigation;