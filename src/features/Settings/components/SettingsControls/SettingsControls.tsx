import { useTheme } from '@/utils/hooks/useTheme';
import { FC } from 'react';
import { SettingsControlsItem } from '../SettingsControlsItem/SettingsControlsItem';
import { SettingsToggle } from '../SettingsToggle/SettingsToggle';

export const SettingsControls: FC = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  const isChecked = (): boolean => {
    return theme === 'dark';
  };

  const setTheme = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    toggleTheme(checked);
  };

  return (
    <div className={'settingsControls'}>
      <SettingsControlsItem title={'Dark theme'}>
        <SettingsToggle checked={isChecked()} onChange={setTheme} />
      </SettingsControlsItem>
    </div>
  );
};
