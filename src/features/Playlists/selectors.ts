import { RootState } from '@/app/store';

export const selectPlaylistById = (state: RootState, id: string) => {
  if (id === state.playlists.favorites.id) {
    return state.playlists.favorites;
  }

  return state.playlists.playlists[id!];
}