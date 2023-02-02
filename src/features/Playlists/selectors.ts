import { RootState } from '@/app/store';

export const selectPlaylistById = (state: RootState, id: string) => {
  if (id === state.playlists.favorites.id) {
    return state.playlists.favorites;
  }

  return state.playlists.playlists[id!];
}

export const selectFavoritesId = (state: RootState) => state.playlists.favorites.id;
export const selectFavorites = (state: RootState) => state.playlists.favorites;
export const selectPlaylists = (state: RootState) => state.playlists.playlists;