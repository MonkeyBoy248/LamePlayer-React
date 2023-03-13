import { TrackModel } from '@/interfaces/Track';
import { tracks } from '@/services/mockDataService';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@/utils/helpers/localStorage/localStorage';

export interface TrackState {
  tracklist: TrackModel[];
  currentTrackIndex: number;
  isPlaying: boolean;
  playbackQueue: TrackModel[];
}

const currentTrackKey = 'currentTrackIndex';
const tracklistKey = 'tracklist';
const playbackQueueKey = 'playbackQueue';

export const trackSlice = createSlice({
  name: 'tracks',
  initialState: getInitialState(),
  reducers: {
    setCurrentTrackIndex: (state, action: PayloadAction<number>) => {
      state.currentTrackIndex = action.payload;
      state.isPlaying = true;

      setItemToLocalStorage(currentTrackKey, action.payload);
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    setPlaybackQueue: (state, action: PayloadAction<TrackModel[]>) => {
      state.playbackQueue = action.payload;

      setItemToLocalStorage(playbackQueueKey, state.playbackQueue);
    },

    addToPlaybackQueue: (state, action: PayloadAction<TrackModel | TrackModel[]>) => {
      if (Array.isArray(action.payload)) {
        const playlistTracsCopy = action.payload.map((track) => {
          return { ...track, id: crypto.randomUUID() };
        });

        state.playbackQueue = [...state.playbackQueue, ...playlistTracsCopy];
        setItemToLocalStorage(playbackQueueKey, state.playbackQueue);

        return;
      }

      const trackCopy: TrackModel = { ...action.payload, id: crypto.randomUUID() };

      state.playbackQueue.push(trackCopy);
      setItemToLocalStorage(playbackQueueKey, state.playbackQueue);
    },

    removeTrack: (state, action: PayloadAction<string>) => {
      state.tracklist = state.tracklist.filter((track) => track.id !== action.payload);
      state.playbackQueue = state.playbackQueue.filter((track) => track.id !== action.payload);

      if (state.currentTrackIndex === state.tracklist.length) {
        state.currentTrackIndex = state.currentTrackIndex - 1;
      }

      setItemToLocalStorage(tracklistKey, state.tracklist);
      setItemToLocalStorage(currentTrackKey, state.currentTrackIndex);
      setItemToLocalStorage(playbackQueueKey, state.playbackQueue);
    },

    removeFromPlaybackQueue: (state, action: PayloadAction<string>) => {
      state.playbackQueue = state.playbackQueue.filter((track) => track.id !== action.payload);

      if (state.currentTrackIndex === state.playbackQueue.length) {
        state.currentTrackIndex = state.currentTrackIndex - 1;
      }

      setItemToLocalStorage(playbackQueueKey, state.playbackQueue);
      setItemToLocalStorage(currentTrackKey, state.currentTrackIndex);
    },

    clearPlaybackQueue: (state) => {
      state.playbackQueue = [];

      setItemToLocalStorage(playbackQueueKey, state.playbackQueue);
    },
  },
});

function getInitialState(): TrackState {
  const currentTrackIndex = getItemFromLocalStorage<number>(currentTrackKey) ?? 0;
  const tracklist = getItemFromLocalStorage<TrackModel[]>(tracklistKey) ?? tracks;
  const playbackQueue = getItemFromLocalStorage<TrackModel[]>(playbackQueueKey) ?? tracklist;

  return {
    currentTrackIndex,
    tracklist,
    playbackQueue,
    isPlaying: false,
  };
}

export const {
  setCurrentTrackIndex,
  setIsPlaying,
  setPlaybackQueue,
  addToPlaybackQueue,
  removeTrack,
  clearPlaybackQueue,
  removeFromPlaybackQueue,
} = trackSlice.actions;
export default trackSlice.reducer;
