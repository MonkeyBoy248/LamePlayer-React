import { useSidebarAppearance } from '@/contexts/SidebarAppearanceContext';
import { FC } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Sidebar.module.scss';

const Sidebar: FC = (): JSX.Element | null => {
  const sidebarTitle = 'My music';
  const { isOpen } = useSidebarAppearance();

  return (
    <aside className={isOpen ? styles.sidebar : `${styles.sidebar} ${styles.sidebar_closed}`}>
      {isOpen && <h2 className={`${styles.sidebar__title} _pageTitle`}>{sidebarTitle}</h2>}
      <Navigation />
    </aside>
  );
};

export default Sidebar;
