import { AppDispatch, RootState } from '@/app/store';
import { addToFavorites, removeFromFavorites } from '@/features/Playlists/playlistsSlice';
import { TrackModel } from '@/interfaces/Track';
import { iconIds } from '@/utils/config/iconIds';
import { useDispatch, useSelector } from 'react-redux';
import Icon from './Icon';

interface FavoritesButtonProps {
  height: string;
  width: string;
  stroke?: string;
  blockName: string;
  className: string;
  track: TrackModel
}

export const FavoritesButton = (
  {
    height,
    width,
    blockName,
    stroke,
    className,
    track
  }: FavoritesButtonProps
  ) => {
  const dispatch: AppDispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.playlists.favorites);
  const inFavorites = favorites.tracks.findIndex((favorite) => favorite.id === track.id) !== -1;

  const updateFavorites = () => {
    if (inFavorites) {
      dispatch(removeFromFavorites(track.id));

      return;
    }

    dispatch(addToFavorites(track))
  }

  return (
    <button className={className} onClick={updateFavorites}>
      <Icon
        id={iconIds.like}
        height={height}
        width={width}
        fill={inFavorites ? '#0FA750' : '#E5E5E5'}
        stroke={stroke}
        blockName={blockName}
      />
    </button>
  )
}
