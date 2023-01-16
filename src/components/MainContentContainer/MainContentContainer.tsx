import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './MainContent.module.scss';
import Home from '@pages/Home/Home';
import { Route, Routes } from 'react-router-dom'
import Tracks from '@pages/Tracks/Tracks';
import PlaylistsPage from '@pages/Playlists/PlaylistsPage';
import { playlists, tracks } from '@services/mockDataService';
import Albums from '@pages/Albums/Albums';
import Artists from '@pages/Artists/Artists';

const MainContentContainer = () => {
  return (
    <main className={styles.mainContent}>
      <div className={`${styles.mainContent__inner}`}>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home title='Recommendations' />}></Route>
          <Route path='/tracks' element={<Tracks title='Tracks' tracks={tracks} />}></Route>
          <Route path='/playlists' element={<PlaylistsPage title='Playlists' />}></Route>
          <Route path='/playlist/:id' element={<Tracks title={playlists[0].name} tracks={playlists[0].tracks} />}></Route>
          <Route path='/albums' element={<Albums title='Albums' />}></Route>
          <Route path='/artists' element={<Artists title='Artists' />}></Route>
        </Routes>
      </div>
    </main>
  )
}

export default MainContentContainer;