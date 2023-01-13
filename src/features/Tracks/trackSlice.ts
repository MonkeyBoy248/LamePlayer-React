import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setItemToLocalStorage } from "@utils/helpers/localStorage";

export interface TrackState {
  currentTrackIndex: number;
  isPlaying: boolean;
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
    }
  }
})

function getInitialState (): TrackState {
  const currentTrackIndex = getItemFromLocalStorage<number>(currentTrackKey) ?? 0;

  return {
    currentTrackIndex,
    isPlaying: false,
    isShuffled: false
  }
}

export const { setNewCurrentTrack, setIsPlaying } = trackSlice.actions;
export default trackSlice.reducer;