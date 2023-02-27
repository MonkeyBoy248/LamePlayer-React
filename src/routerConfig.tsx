import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Albums from './pages/Albums/Albums';
import Artists from './pages/Artists/Artists';
import Home from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Playlist } from './pages/Playlist/Playlist';
import Playlists from './pages/Playlists/Playlists';
import { Settings } from './pages/Settings/Settings';
import Tracks from './pages/Tracks/Tracks';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home title={'Home'} />,
      },
      {
        path: 'tracks',
        element: <Tracks title={'Tracks'} />,
      },
      {
        path: 'playlists',
        element: <Playlists title={'Playlists'} />,
      },
      {
        path: 'playlists/:id',
        element: <Playlist />,
        errorElement: <NotFound />,
      },
      {
        path: 'albums',
        element: <Albums title={'Albums'} />,
      },
      {
        path: 'artists',
        element: <Artists title={'Artists'} />,
      },
      {
        path: 'settings',
        element: <Settings title={'Settings'} />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
