import { AppDispatch } from '@/app/store';
import { PlaylistModel } from '@/interfaces/Playlist';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePlaylistTitle } from '../playlistsSlice';

interface UsePlaylistTitle {
  title: string;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleEnterKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  editPlaylistTitle: () => void;
}

export const usePlaylistTitle = (playlist: PlaylistModel): UsePlaylistTitle => {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState<string>(playlist.title);

  const handleInputChange = useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    const newTitle = e.currentTarget.value;

    setTitle(newTitle);
  }, []);

  const editPlaylistTitle = useCallback((): void => {
    if (!title) {
      setTitle(playlist.title);
      dispatch(changePlaylistTitle({ id: playlist.id, title: playlist.title }));

      return;
    }

    if (title === playlist.title) {
      return;
    }

    dispatch(changePlaylistTitle({ id: playlist.id, title }));
  }, [title, playlist]);

  const handleEnterKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') {
      return;
    }

    e.currentTarget.blur();
  }, []);

  return {
    title,
    handleInputChange,
    handleEnterKeyDown,
    editPlaylistTitle,
  };
};
