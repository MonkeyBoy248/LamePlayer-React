import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@utils/helpers/localStorage';

export type Theme = 'light' | 'dark';

export interface UserState {
  theme: Theme;
}

const themeKey = 'theme';

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;

      setItemToLocalStorage(themeKey, state.theme);
    },
  },
});

function getInitialState(): UserState {
  const theme = getItemFromLocalStorage<Theme>(themeKey) ?? 'dark';

  return {
    theme,
  };
}

export const { setTheme } = userSlice.actions;
export default userSlice.reducer;
