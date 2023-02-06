import { PlaylistModel } from '@/interfaces/Playlist';

export const getTracksAmount = (playlist: PlaylistModel) => {
  const tracksAmount = playlist.tracks.length;

  return tracksAmount === 1 ? `${tracksAmount} track` : `${tracksAmount} tracks`;
}