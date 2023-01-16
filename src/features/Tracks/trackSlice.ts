import { TrackModel } from '@/interfaces/Track';
import { tracks } from '@/services/mockDataService';
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setItemToLocalStorage } from "@utils/helpers/localStorage";

export interface TrackState {
  playlist: TrackModel[],
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
    },

    setCurrentPlayList: (state, action: PayloadAction<TrackModel[]>) => {
      state.playlist = action.payload;
    }
  }
})

function getInitialState (): TrackState {
  const currentTrackIndex = getItemFromLocalStorage<number>(currentTrackKey) ?? 0;

  return {
    currentTrackIndex,
    playlist: tracks,
    isPlaying: false,
    isShuffled: false
  }
}

export const { setNewCurrentTrack, setIsPlaying, setCurrentPlayList } = trackSlice.actions;
export default trackSlice.reducer;