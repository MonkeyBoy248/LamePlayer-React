import { FC, ReactNode } from 'react';
import styles from './SettingsControlsItem.module.scss';

interface SettingsControlsProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const SettingsControlsItem: FC<SettingsControlsProps> = ({
  children,
  title,
  subtitle,
}: SettingsControlsProps): JSX.Element => {
  return (
    <div className={styles.settingsControlsItem}>
      <div className={styles.settingsControlsItem__textWrapper}>
        <p className={styles.settingsControlsItem__title}>{title}</p>
        {subtitle && <p className={styles.settingsControlsItem__subtitle}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};
