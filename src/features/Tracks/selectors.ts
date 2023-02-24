import { RootState } from '@/app/store';
import { TrackModel } from '@/interfaces/Track';

export const selectAllTracks = (state: RootState): TrackModel[] => state.tracks.tracklist;
export const selectCurrentTrack = (state: RootState): TrackModel | null => {
  const tracklist = state.tracks.playbackQueue;
  const currentTrackIndex = state.tracks.currentTrackIndex;

  if (currentTrackIndex === -1) {
    return null;
  }

  return tracklist[currentTrackIndex];
};
export const selectPlayingStatus = (state: RootState): boolean => state.tracks.isPlaying;
export const selectPlaybackQueue = (state: RootState): TrackModel[] => state.tracks.playbackQueue;
export const selectCurrentTrackIndex = (state: RootState): number => state.tracks.currentTrackIndex;
