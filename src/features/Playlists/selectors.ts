import { RootState } from '@/app/store';

export const selectPlaylistById = (state: RootState, id: string) => state.playlists.playlists[id!];
export const selectFavoritesId = (state: RootState) => state.playlists.favoritesId;
export const selectFavorites = (state: RootState) => {
  const playlists = state.playlists.playlists;
  const favoritesId = state.playlists.favoritesId;

  return playlists[favoritesId];
}
export const selectAllPlaylists = (state: RootState) => state.playlists.playlists;