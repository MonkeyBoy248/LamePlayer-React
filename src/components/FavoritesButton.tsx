import { AppDispatch } from '@/app/store';
import { addTrackToPlaylist, removeTrackFromPlaylist } from '@/features/Playlists/playlistsSlice';
import { selectFavorites } from '@/features/Playlists/selectors';
import { TrackModel } from '@/interfaces/Track';
import { iconIds } from '@/utils/config/iconIds';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from './Icon';

interface FavoritesButtonProps {
  height: string;
  width: string;
  stroke?: string;
  className: string;
  track: TrackModel
}

export const FavoritesButton = (
  {
    height,
    width,
    stroke,
    className,
    track
  }: FavoritesButtonProps
  ) => {
  const dispatch: AppDispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const inFavorites = useMemo(
    () => favorites.tracks.findIndex((favorite) => favorite.id === track.id) !== -1,
    [favorites, track]);

  const updateFavorites = () => {
    if (inFavorites) {
      dispatch(removeTrackFromPlaylist({trackId: track.id, playlistId: favorites.id}));

      return;
    }

    dispatch(addTrackToPlaylist({track, playlistId: favorites.id}));
  }

  return (
    <button className={className} onClick={updateFavorites}>
      <Icon
        id={iconIds.like}
        height={height}
        width={width}
        fill={inFavorites ? '#0FA750' : '#E5E5E5'}
        stroke={stroke}
      />
    </button>
  )
}
