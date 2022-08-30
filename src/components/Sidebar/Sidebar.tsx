import React from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.sidebar__title}>Моя музыка</h2>
      <Navigation />
    </aside>
  )
}

export default Sidebar;