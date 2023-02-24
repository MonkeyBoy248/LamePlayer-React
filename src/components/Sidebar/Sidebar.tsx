import { FC } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Sidebar.module.scss';

const Sidebar: FC = (): JSX.Element => {
  const sidebarTitle = 'My music';

  return (
    <aside className={styles.sidebar}>
      <h2 className={`${styles.sidebar__title} _pageTitle`}>{sidebarTitle}</h2>
      <Navigation />
    </aside>
  );
};

export default Sidebar;
