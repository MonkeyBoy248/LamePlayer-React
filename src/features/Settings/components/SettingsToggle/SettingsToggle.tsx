import { useState } from 'react';
import { CustomSwitch } from '../Switch';
import styles from './SettingsToggle.module.scss';

interface SettingsToggleProps {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined;
  checked: boolean;
}

export const SettingsToggle = ({ onChange, checked }: SettingsToggleProps) => {
  const getLabel = (): string => {
    return checked ? 'On' : 'Off';
  }

  return (
    <div className={styles.settingsToggle}>
      <CustomSwitch checked={checked} onChange={onChange}/>
      <span className={styles.settingsToggle__label}>{getLabel()}</span>
    </div>
  )
}
