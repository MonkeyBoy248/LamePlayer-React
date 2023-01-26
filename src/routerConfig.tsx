import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Albums from './pages/Albums/Albums';
import Artists from './pages/Artists/Artists';
import Home from './pages/Home/Home';
import { Playlist } from './pages/Playlist/Playlist';
import PlaylistsPage from './pages/Playlists/PlaylistsPage';
import Tracks from './pages/Tracks/Tracks';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home title={'Home'} />
      },
      {
        path: 'tracks',
        element: <Tracks title={'Tracks'} />
      },
      {
        path: 'playlists',
        element: <PlaylistsPage title={'Playlists'} />
      },
      {
        path: 'albums',
        element: <Albums title={'Albums'} />
      },
      {
        path: 'artists',
        element: <Artists title={'Artists'} />
      },
      {
        path: 'playlist/:id',
        element: <Playlist/>
      }
    ]
  },
])