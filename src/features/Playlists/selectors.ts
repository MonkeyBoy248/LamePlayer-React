import { RootState } from '@/app/store';
import { PlaylistModel, Playlists } from '@/interfaces/Playlist';

export const selectPlaylistById = (state: RootState, id: string): PlaylistModel => state.playlists.playlists[id];
export const selectFavoritesId = (state: RootState): string => state.playlists.favoritesId;
export const selectFavorites = (state: RootState): PlaylistModel => {
  const playlists = state.playlists.playlists;
  const favoritesId = state.playlists.favoritesId;

  return playlists[favoritesId];
};
export const selectAllPlaylists = (state: RootState): Playlists => state.playlists.playlists;
