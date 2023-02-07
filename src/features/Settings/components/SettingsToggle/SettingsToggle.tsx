import { CustomSwitch } from '../Switch';
import styles from './SettingsToggle.module.scss';

export const SettingsToggle = () => {
  return (
    <div className={styles.settingsToggle}>
      <CustomSwitch />
      <span className={styles.settingsToggle__label}>On</span>
    </div>
  )
}
