import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { tracks } from "@services/mockDataService";
import { TrackModel } from "@interfaces/Track";
import { getItemFromLocalStorage, setItemToLocalStorage } from "@utils/helpers/localStorage";

export interface TrackState {
  currentTrack: TrackModel;
  isPlaying: boolean;
}

const currentTrackKey = 'currentTrack';

export const trackSlice = createSlice({
  name: 'track',
  initialState: getInitialState(),
  reducers: {
    setNewCurrentTrack: (state, action: PayloadAction<TrackModel>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;

      setItemToLocalStorage(currentTrackKey, action.payload);
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    }
  }
})

function getInitialState (): TrackState {
  const currentTrack = getItemFromLocalStorage<TrackModel>(currentTrackKey) ?? tracks[0];

  return {
    currentTrack,
    isPlaying: false,
  }
}

export const { setNewCurrentTrack, setIsPlaying } = trackSlice.actions;
export default trackSlice.reducer;