import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { tracks } from "@services/mockDataService";

export interface TrackState {
  currentTrackID: string;
}

export const trackSlice = createSlice({
  name: 'track',
  initialState: getInitialState(),
  reducers: {
    setNewCurrentTrack: (state, action: PayloadAction<string>) => {
      state.currentTrackID = action.payload;
    }
  }

})

function getInitialState (): TrackState {
  const currentTrackID = localStorage.getItem('currentTrackID') ?? tracks[0].id;

  return {
    currentTrackID
  }
}

export const { setNewCurrentTrack } = trackSlice.actions;
export default trackSlice.reducer;