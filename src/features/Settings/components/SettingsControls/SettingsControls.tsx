import { SettingsControlsItem } from '../SettingsControlsItem/SettingsControlsItem';
import { SettingsToggle } from '../SettingsToggle/SettingsToggle';
import { CustomSwitch } from '../Switch';

export const SettingsControls = () => {
  return (
    <div className={'settingsControls'}>
      <SettingsControlsItem title={'Dark theme'}>
        <SettingsToggle />
      </SettingsControlsItem>
    </div>
  )
}
