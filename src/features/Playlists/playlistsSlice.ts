import { PlaylistModel, Playlists } from '@/interfaces/Playlist';
import { TrackModel } from '@/interfaces/Track';
import { getInitialPlaylists } from '@/services/mockDataService';
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setItemToLocalStorage } from '@utils/helpers/localStorage';
import { removeTrack } from '../Tracks/tracksSlice';

export interface PlaylistsState {
  playlists: Playlists;
  favoritesId: string;
}

const playlistsKey = 'playlists';

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: getInitialState(),
  reducers: {
    createPlaylist: (state, action: PayloadAction<PlaylistModel>) => {
      state.playlists[action.payload.id] = action.payload;

      setItemToLocalStorage(playlistsKey, state.playlists)
    },

    changePlaylistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
      const playlist = state.playlists[action.payload.id];
      playlist.title = action.payload.title;
      playlist.dateOfUpdate = Date.now();

      setItemToLocalStorage(playlistsKey, state.playlists)
    },

    removePlaylistById: (state, action: PayloadAction<string>) => {
      delete state.playlists[action.payload];

      setItemToLocalStorage(playlistsKey, state.playlists);
    },

    addTrackToPlaylist: (state, action: PayloadAction<{ track: TrackModel, playlistId: string }>) => {
      const playlist = state.playlists[action.payload.playlistId];

      playlist.tracks.push(action.payload.track);
      playlist.dateOfUpdate = Date.now();
      playlist.coverUrl = action.payload.track.coverUrl;

      setItemToLocalStorage(playlistsKey, state.playlists);
    },

    addTracksToTheNewPlaylist: (state, action: PayloadAction<TrackModel[]>) => {
      const lastTrack = action.payload.at(-1)!;
      const newPlaylist: PlaylistModel = {
        id: crypto.randomUUID(),
        title: 'New playlist',
        createdByUser: true,
        dateOfCreation: Date.now(),
        dateOfUpdate: Date.now(),
        tracks: action.payload,
        coverUrl: lastTrack.coverUrl,
        user: 'MonkeyBoy'
      };

      state.playlists[newPlaylist.id] = newPlaylist;
      setItemToLocalStorage(playlistsKey, state.playlists);
    },

    removeTrackFromPlaylist: (state, action: PayloadAction<{ trackId: string, playlistId: string }>) => {
      const playlist = state.playlists[action.payload.playlistId];

      playlist.tracks = playlist.tracks.filter((track) => track.id !== action.payload.trackId);
      playlist.coverUrl = getPlaylistCover(playlist, state);

      setItemToLocalStorage(playlistsKey, state.playlists);
    },
  },
  extraReducers(builder) {
    builder.addCase(removeTrack, (state, action) => {
      const playlists = state.playlists;

      for (const playlist of Object.values(playlists)) {
        const trackIndex = playlist.tracks.findIndex((track) => track.id === action.payload);

        if (trackIndex === -1) {
          continue;
        }

        playlist.tracks = playlist.tracks.filter((track) => track.id !== action.payload);
        playlist.coverUrl = getPlaylistCover(playlist, state);
      }

      setItemToLocalStorage(playlistsKey, state.playlists);
    })
  },
})

function getInitialState (): PlaylistsState {
  const playlists = getItemFromLocalStorage<Playlists>(playlistsKey) ?? getInitialPlaylists();
  const favoritesId = Object.keys(playlists)[0];

  return {
    playlists,
    favoritesId,
  }
}

function getPlaylistCover (playlist: PlaylistModel, state: PlaylistsState): string {
  const playlistTracksLength = playlist.tracks.length;
  const favoritesId = state.favoritesId;
  const playlistPlaceholderUrl = playlist.id === favoritesId ? 'favorites-placeholder.jpg' : 'playlist-placeholder.webp';

  if (playlistTracksLength === 0) {
    return playlistPlaceholderUrl;
  }

  const lastFavoritesTrack = playlist.tracks[playlistTracksLength - 1];

  return lastFavoritesTrack.coverUrl;
}

export const {
  createPlaylist,
  changePlaylistTitle,
  removePlaylistById,
  addTrackToPlaylist,
  addTracksToTheNewPlaylist,
  removeTrackFromPlaylist,
} = playlistsSlice.actions;
export default playlistsSlice.reducer;