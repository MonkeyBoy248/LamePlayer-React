import { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectPlaylistById = (state: RootState, id: string) => {
  if (id === state.playlists.favorites.id) {
    return state.playlists.favorites;
  }

  return state.playlists.customPlaylists[id!];
}

export const selectFavoritesId = (state: RootState) => state.playlists.favorites.id;
export const selectFavorites = (state: RootState) => state.playlists.favorites;
export const selectCustomPlaylists = (state: RootState) => state.playlists.customPlaylists;
export const selectAllPlaylists = createSelector([selectFavorites, selectCustomPlaylists], (favorites, customPlaylists) => {
  return {...customPlaylists, [favorites.id]: favorites};
})