import { RootState } from '@/app/store';

export const selectAllTracks = (state: RootState) => state.tracks.tracklist;
export const selectCurrentTrack = (state: RootState) => {
  const tracklist = state.tracks.tracklist;
  const currentTrackIndex = state.tracks.currentTrackIndex;

  return tracklist[currentTrackIndex];
};
export const selectPlayingStatus = (state: RootState) => state.tracks.isPlaying;
