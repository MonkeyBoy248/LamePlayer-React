import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './MainContent.module.scss';
import Recommendations from '../../pages/Recommendations';

const MainContent = () => {
  return (
    <main className={styles.mainContent}>
      <div className={`${styles.mainContent__inner}`}>
        <Sidebar />
        <Recommendations />
      </div>
    </main>
  )
}

export default MainContent;