import Sidebar from '../Sidebar/Sidebar';
import styles from './MainContent.module.scss';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

const MainContentContainer: FC = (): JSX.Element => {
  return (
    <main className={styles.mainContent}>
      <div className={`${styles.mainContent__inner}`}>
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
};

export default MainContentContainer;
