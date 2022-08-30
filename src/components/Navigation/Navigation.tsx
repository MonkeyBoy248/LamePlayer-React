import React from 'react';
import NavItem from '../Navitem/NavItem';
import { NavigationItem } from '../../interfaces/NavigationItem';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const blockName = 'navItem';
  const width = '1.5em';
  const height = '1.5em';
  const fill = '#E5E5E5';

  const navigationItems: NavigationItem[] = [
    {
      title: 'Треки',
      svg: {
        id: 'icon-tracks',
        width,
        height,
        fill,
        blockName,
      }
    },
    {
      title: 'Альбомы',
      svg: {
        id: 'icon-albums',
        width,
        height,
        fill,
        blockName,
      }
    },
    {
      title: 'Плейлисты',
      svg: {
        id: 'icon-playlists',
        width,
        height,
        fill,
        blockName,
      }
    },
    {
      title: 'Настройки',
      svg: {
        id: 'icon-settings',
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