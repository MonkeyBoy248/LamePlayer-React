import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setItemToLocalStorage } from "@utils/helpers/localStorage";

export interface TrackState {
  currentTrackIndex: number;
  isPlaying: boolean;
  isLooped: boolean;
  isShuffled: boolean;
}

const currentTrackKey = 'currentTrackIndex';

export const trackSlice = createSlice({
  name: 'track',
  initialState: getInitialState(),
  reducers: {
    setNewCurrentTrack: (state, action: PayloadAction<number>) => {
      state.currentTrackIndex = action.payload;
      state.isPlaying = true;

      setItemToLocalStorage(currentTrackKey, action.payload);
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    setIsLooped: (state, action: PayloadAction<boolean>) => {
      state.isLooped = action.payload;
    }
  }
})

function getInitialState (): TrackState {
  const currentTrackIndex = getItemFromLocalStorage<number>(currentTrackKey) ?? 0;

  return {
    currentTrackIndex,
    isPlaying: false,
    isLooped: false,
    isShuffled: false
  }
}

export const { setNewCurrentTrack, setIsPlaying, setIsLooped } = trackSlice.actions;
export default trackSlice.reducer;