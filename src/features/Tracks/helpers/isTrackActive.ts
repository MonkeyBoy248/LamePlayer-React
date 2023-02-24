import { TrackModel } from '@/interfaces/Track';

export const isTrackActive = (track: TrackModel, currentTrack: TrackModel | null): boolean => {
  if (!currentTrack) {
    return false;
  }

  return currentTrack.id === track.id;
};
