import { RootState } from '@/app/store';
import { Theme } from './userSlice';

export const selectTheme = (state: RootState): Theme => state.user.theme;
