import { RootState } from '@/app/store';
import { PlaylistModel } from '@/interfaces/Playlist';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectPlaylistById } from '../selectors';

export const useInitPlaylist = (): PlaylistModel => {
  const { id } = useParams();
  const playlist = useSelector((state: RootState) => selectPlaylistById(state, id as string));

  return playlist;
};
