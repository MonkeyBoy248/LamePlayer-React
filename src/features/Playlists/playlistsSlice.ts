import { PlaylistModel } from '@/interfaces/Playlist';
import { TrackModel } from '@/interfaces/Track';
import { getFavorites } from '@/services/mockDataService';
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setItemToLocalStorage } from '@utils/helpers/localStorage';
import { removeTrack } from '../Tracks/tracksSlice';


interface Playlists {
  [key: string]: PlaylistModel;
}

export interface PlaylistsState {
  customPlaylists: Playlists;
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
      const favoritesPlaceholderUrl = 'favorites-placeholder.jpg';
      state.favorites.coverUrl = getPlaylistCover(state.favorites, favoritesPlaceholderUrl);

      setItemToLocalStorage(favoritesKey, state.favorites)
    },

    createPlaylist: (state, action: PayloadAction<PlaylistModel>) => {
      state.customPlaylists[action.payload.id] = action.payload;

      setItemToLocalStorage(playlistsKey, state.customPlaylists)
    },

    changePlaylistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
      const playlist = state.customPlaylists[action.payload.id];
      playlist.title = action.payload.title;
      playlist.dateOfUpdate = Date.now();

      setItemToLocalStorage(playlistsKey, state.customPlaylists)
    },

    removePlaylistById: (state, action: PayloadAction<string>) => {
      delete state.customPlaylists[action.payload];

      setItemToLocalStorage(playlistsKey, state.customPlaylists);
    },

    addTrackToPlaylist: (state, action: PayloadAction<{ track: TrackModel, playlistId: string }>) => {
      const favoritesId = state.favorites.id;
      const allPlaylists = {...state.customPlaylists, [favoritesId]: state.favorites };
      const playlist = allPlaylists[action.payload.playlistId];

      playlist.tracks.push(action.payload.track);
      playlist.dateOfUpdate = Date.now();
      playlist.coverUrl = action.payload.track.coverUrl;

      if (action.payload.playlistId === favoritesId) {
        setItemToLocalStorage(favoritesKey, state.favorites);

        return;
      }

      setItemToLocalStorage(playlistsKey, state.customPlaylists);
    },

    addTrackToTheNewPlaylist: (state, action: PayloadAction<TrackModel>) => {
      const newPlaylist = {
        id: crypto.randomUUID(),
        title: 'New playlist',
        dateOfCreation: Date.now(),
        dateOfUpdate: Date.now(),
        tracks: [action.payload],
        coverUrl: action.payload.coverUrl,
        user: 'MonkeyBoy'
      };

      state.customPlaylists[newPlaylist.id] = newPlaylist;
      setItemToLocalStorage(playlistsKey, state.customPlaylists);
    },

    removeTrackFromPlaylist: (state, action: PayloadAction<{ trackId: string, playlistId: string }>) => {
      const favoritesId = state.favorites.id;
      const allPlaylists = {...state.customPlaylists, [favoritesId]: state.favorites };
      const playlist = allPlaylists[action.payload.playlistId];

      playlist.tracks = playlist.tracks.filter((track) => track.id !== action.payload.trackId);
      
      const playlistPlaceholderUrl = playlist.id === favoritesId ? 'favorites-placeholder.jpg' : 'playlist-placeholder.webp';
      playlist.coverUrl = getPlaylistCover(playlist, playlistPlaceholderUrl);

      if (action.payload.playlistId === favoritesId) {
        setItemToLocalStorage(favoritesKey, state.favorites);

        return;
      }

      setItemToLocalStorage(playlistsKey, state.customPlaylists);
    },
  },
  extraReducers(builder) {
    builder.addCase(removeTrack, (state, action) => {
      const favoritesId = state.favorites.id;
      const allPlaylists = {...state.customPlaylists, [favoritesId]: state.favorites };

      for (const playlist of Object.values(allPlaylists)) {
        const trackIndex = playlist.tracks.findIndex((track) => track.id === action.payload);

        if (trackIndex === -1) {
          continue;
        }

        playlist.tracks = playlist.tracks.filter((track) => track.id !== action.payload);

        const playlistPlaceholderUrl = playlist.id === favoritesId ? 'favorites-placeholder.jpg' : 'playlist-placeholder.webp';
        playlist.coverUrl = getPlaylistCover(playlist, playlistPlaceholderUrl);
      }

      setItemToLocalStorage(favoritesKey, state.favorites);
      setItemToLocalStorage(playlistsKey, state.customPlaylists);
    })
  },
})

function getInitialState (): PlaylistsState {
  const playlists = getItemFromLocalStorage<Playlists>(playlistsKey) ?? {};
  const favorites = getItemFromLocalStorage<PlaylistModel>(favoritesKey) ?? getFavorites();

  return {
    customPlaylists: playlists,
    favorites,
  }
}

function getPlaylistCover (playlist: PlaylistModel, playlistPlaceholderUrl: string): string {
  const playlistTracksLength = playlist.tracks.length;

  if (playlistTracksLength === 0) {
    return playlistPlaceholderUrl;
  }

  const lastFavoritesTrack = playlist.tracks[playlistTracksLength - 1];

  return lastFavoritesTrack.coverUrl;
}

export const {
  addToFavorites,
  removeFromFavorites,
  createPlaylist,
  changePlaylistTitle,
  removePlaylistById,
  addTrackToPlaylist,
  addTrackToTheNewPlaylist,
  removeTrackFromPlaylist,
} = playlistsSlice.actions;
export default playlistsSlice.reducer;