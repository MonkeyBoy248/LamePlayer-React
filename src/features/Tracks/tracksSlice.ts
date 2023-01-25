import { TrackModel } from '@/interfaces/Track';
import { tracks } from '@/services/mockDataService';
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setItemToLocalStorage } from "@utils/helpers/localStorage";

export interface TrackState {
  tracklist: TrackModel[],
  currentTrackIndex: number;
  isPlaying: boolean;
}

const currentTrackKey = 'currentTrackIndex';
const tracklistKey = 'tracklist';

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
    }
  }
})

function getInitialState (): TrackState {
  const currentTrackIndex = getItemFromLocalStorage<number>(currentTrackKey) ?? 0;
  const tracklist = getItemFromLocalStorage<TrackModel[]>(tracklistKey) ?? tracks;

  return {
    currentTrackIndex,
    tracklist,
    isPlaying: false,
  }
}

export const { setCurrentTrackIndex, setIsPlaying } = trackSlice.actions;
export default trackSlice.reducer;