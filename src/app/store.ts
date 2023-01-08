import { configureStore } from "@reduxjs/toolkit";
import trackReducer from "@features/Tracks/trackSlice";

export const store = configureStore(
  {
      reducer: {
        tracks: trackReducer
      },
  }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;