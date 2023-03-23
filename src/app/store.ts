import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import tracksReducer from '@/features/Tracks/tracksSlice';
import playlistsReducer from '@/features/Playlists/playlistsSlice';
import userReducer from '@features/User/userSlice';

const rootReducer = combineReducers({
  tracks: tracksReducer,
  playlists: playlistsReducer,
  user: userReducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
