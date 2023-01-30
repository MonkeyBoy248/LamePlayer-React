import { TrackModel } from '@/interfaces/Track';
import { tracks } from '@/services/mockDataService';
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setItemToLocalStorage } from "@utils/helpers/localStorage";

export interface TrackState {
  tracklist: TrackModel[],
  currentTrackIndex: number;
  isPlaying: boolean;
  playbackQueue: TrackModel[];
}

const currentTrackKey = 'currentTrackIndex';
const tracklistKey = 'tracklist';
const playbackQueueKey = 'playbackQueue'

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

      setItemToLocalStorage(playbackQueueKey, state.playbackQueue)
    },

    addToPlaybackQueue: (state, action: PayloadAction<TrackModel | TrackModel[]>) => {
      if (Array.isArray(action.payload)) {
        state.playbackQueue = [...state.playbackQueue, ...action.payload];
        setItemToLocalStorage(playbackQueueKey, state.playbackQueue)

        return;
      }

      state.playbackQueue = [...state.playbackQueue, action.payload];
      setItemToLocalStorage(playbackQueueKey, state.playbackQueue)
    }
  }
})

function getInitialState (): TrackState {
  const currentTrackIndex = getItemFromLocalStorage<number>(currentTrackKey) ?? 0;
  const tracklist = getItemFromLocalStorage<TrackModel[]>(tracklistKey) ?? tracks;
  const playbackQueue = getItemFromLocalStorage<TrackModel[]>(playbackQueueKey) ?? tracklist;

  return {
    currentTrackIndex,
    tracklist,
    playbackQueue,
    isPlaying: false,
  }
}

export const { setCurrentTrackIndex, setIsPlaying, setPlaybackQueue, addToPlaybackQueue } = trackSlice.actions;
export default trackSlice.reducer;