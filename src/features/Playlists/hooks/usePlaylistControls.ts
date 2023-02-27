import { AppDispatch } from '@/app/store';
import { setPlaybackQueue, setCurrentTrackIndex, addToPlaybackQueue } from '@/features/Tracks/tracksSlice';
import { PlaylistModel } from '@/interfaces/Playlist';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeTrackFromPlaylist, removePlaylistById } from '../playlistsSlice';

interface UsePlaylistControls {
  deleteTrackFromPlaylist: (trackId: string) => void;
  addPlaylistTracksToPlaybackQueue: () => void;
  removePlaylist: () => void;
  runPlayllist: () => void;
}

export const usePlaylistControls = (playlist: PlaylistModel): UsePlaylistControls => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const deleteTrackFromPlaylist = useCallback(
    (trackId: string): void => {
      dispatch(removeTrackFromPlaylist({ trackId, playlistId: playlist.id }));
    },
    [playlist]
  );

  const runPlayllist = useCallback((): void => {
    dispatch(setPlaybackQueue(playlist.tracks));
    dispatch(setCurrentTrackIndex(0));
  }, [playlist]);

  const removePlaylist = useCallback((): void => {
    dispatch(removePlaylistById(playlist.id));
    navigate('/playlists');
  }, [playlist]);

  const addPlaylistTracksToPlaybackQueue = useCallback((): void => {
    dispatch(addToPlaybackQueue(playlist.tracks));
  }, [playlist]);

  return {
    deleteTrackFromPlaylist,
    addPlaylistTracksToPlaybackQueue,
    removePlaylist,
    runPlayllist,
  };
};
