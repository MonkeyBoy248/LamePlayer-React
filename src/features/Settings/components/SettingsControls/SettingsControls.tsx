import { useTheme } from '@/utils/hooks/useTheme';
import { SettingsControlsItem } from '../SettingsControlsItem/SettingsControlsItem';
import { SettingsToggle } from '../SettingsToggle/SettingsToggle';

export const SettingsControls = () => {
  const { theme, toggleTheme } = useTheme();

  const isChecked = (): boolean => {
    return theme === 'dark';
  }

  return (
    <div className={'settingsControls'}>
      <SettingsControlsItem title={'Dark theme'}>
        <SettingsToggle checked={isChecked()} onChange={(e, checked) => toggleTheme(checked)}/>
      </SettingsControlsItem>
    </div>
  )
}
