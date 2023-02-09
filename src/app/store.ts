import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from '@/features/Tracks/tracksSlice';
import playlistsReducer from '@/features/Playlists/playlistsSlice';
import userReducer from '@features/User/userSlice';

export const store = configureStore(
  {
    reducer: {
      tracks: tracksReducer,
      playlists: playlistsReducer,
      user: userReducer
    },
  }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;