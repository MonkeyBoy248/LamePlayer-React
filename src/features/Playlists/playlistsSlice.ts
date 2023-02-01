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
  playlists: Playlists;
  favorites: PlaylistModel;
}

const playlistsKey = 'playlists';
const favoritesKey = 'favorites';

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: getInitialState(),
  reducers: {
    addToFavorites: (state, action: PayloadAction<TrackModel>) => {
      state.favorites.tracks.push(action.payload)
      state.favorites.dateOfUpdate = Date.now();
      state.favorites.coverUrl = action.payload.coverUrl;

      setItemToLocalStorage(favoritesKey, state.favorites)
    },

    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites.tracks = state.favorites.tracks.filter((track) => track.id !== action.payload);
      state.favorites.dateOfUpdate = Date.now();

      const favoritesTracksLength = state.favorites.tracks.length;

      if (favoritesTracksLength === 0) {
        state.favorites.coverUrl = 'favorites-placeholder.jpg';

        setItemToLocalStorage(favoritesKey, state.favorites)

        return;
      }

      const lastFavoritesTrack = state.favorites.tracks[favoritesTracksLength - 1];
      state.favorites.coverUrl = lastFavoritesTrack.coverUrl;

      setItemToLocalStorage(favoritesKey, state.favorites)
    },

    createPlaylist: (state, action: PayloadAction<PlaylistModel>) => {
      state.playlists[action.payload.id] = action.payload;

      setItemToLocalStorage(playlistsKey, state.playlists)
    },

    changePlaylistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
      const playlist = state.playlists[action.payload.id];
      playlist.title = action.payload.title;
      state.favorites.dateOfUpdate = Date.now();

      setItemToLocalStorage(playlistsKey, state.playlists)
    },

    removePlaylistById: (state, action: PayloadAction<string>) => {
      delete state.playlists[action.payload];

      setItemToLocalStorage(playlistsKey, state.playlists);
    }
  }
})

function getInitialState (): PlaylistsState {
  const playlists = getItemFromLocalStorage<Playlists>(playlistsKey) ?? {};
  const favorites = getItemFromLocalStorage<PlaylistModel>(favoritesKey) ?? getFavorites();

  return {
    playlists,
    favorites,
  }
}

export const {
  addToFavorites,
  removeFromFavorites,
  createPlaylist,
  changePlaylistTitle,
  removePlaylistById
} = playlistsSlice.actions;
export default playlistsSlice.reducer;