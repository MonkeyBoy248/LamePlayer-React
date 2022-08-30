import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './MainContent.module.scss';

const MainContent = () => {
  return (
    <main className={styles.mainContent}>
      <div className={`${styles.mainContent__inner}`}>
        <Sidebar />
      </div>
    </main>
  )
}

export default MainContent;