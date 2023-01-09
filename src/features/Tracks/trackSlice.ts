import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { tracks } from "@services/mockDataService";
import { TrackModel } from "@interfaces/Track";

export interface TrackState {
  currentTrack: TrackModel;
  isPlaying: boolean;
}

export const trackSlice = createSlice({
  name: 'track',
  initialState: getInitialState(),
  reducers: {
    setNewCurrentTrack: (state, action: PayloadAction<TrackModel>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    }
  }
})

function getInitialState (): TrackState {
  const currentTrack = JSON.parse(localStorage.getItem('currentTrackID') ?? 'null') ?? tracks[0];

  return {
    currentTrack,
    isPlaying: false,
  }
}

export const { setNewCurrentTrack, setIsPlaying } = trackSlice.actions;
export default trackSlice.reducer;