import { PlaylistModel } from '@/interfaces/Playlist';
import { TrackModel } from '@/interfaces/Track';
import { getFavorites } from '@/services/mockDataService';
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setItemToLocalStorage } from "@utils/helpers/localStorage";

interface Playlists {
  [key: string]: PlaylistModel;
}

export interface PlaylistsState {
  currentPlaylist: TrackModel[];
  playlists: Playlists;
  favorites: PlaylistModel;
}

const playlistsKey = 'playlists';
const favoritesKey = 'favorites';

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: getInitialState(),
  reducers: {
    setCurrentPlayList: (state, action: PayloadAction<TrackModel[]>) => {
      state.currentPlaylist = action.payload;
    },

    addToFavorites: (state, action: PayloadAction<TrackModel>) => {
      state.favorites.tracks.push(action.payload)
      state.favorites.dateOfUpdate = Date.now();

      setItemToLocalStorage('favorites', state.favorites)
    },

    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites.tracks = state.favorites.tracks.filter((track) => track.id !== action.payload);
      state.favorites.dateOfUpdate = Date.now();

      setItemToLocalStorage('favorites', state.favorites)
    }
  }
})

function getInitialState (): PlaylistsState {
  const playlists = getItemFromLocalStorage<Playlists>(playlistsKey) ?? {};
  const favorites = getItemFromLocalStorage<PlaylistModel>(favoritesKey) ?? getFavorites();

  return {
    playlists,
    favorites,
    currentPlaylist: []
  }
}

export const { setCurrentPlayList, addToFavorites, removeFromFavorites } = playlistsSlice.actions;
export default playlistsSlice.reducer;