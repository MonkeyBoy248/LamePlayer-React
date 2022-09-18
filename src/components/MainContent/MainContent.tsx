import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './MainContent.module.scss';
import Home from '../../pages/Home/Home';
import { Route, Routes } from 'react-router-dom'
import Tracks from '../../pages/Tracks/Tracks';

const MainContent = () => {
  return (
    <main className={styles.mainContent}>
      <div className={`${styles.mainContent__inner}`}>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home title='Recommendations' />}></Route>
          <Route path='/tracks' element={<Tracks title='Tracks'></Tracks>}></Route>
        </Routes>
      </div>
    </main>
  )
}

export default MainContent;