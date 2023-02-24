import { FC } from 'react';
import Icon from '../Icon';
import styles from './MenuItem.module.scss';

interface MenuItemProps {
  iconId: string;
  title: string;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

export const MenuItem: FC<MenuItemProps> = ({ iconId, title, onClick }: MenuItemProps): JSX.Element => {
  return (
    <li className={styles.contextMenuItem__wrapper} onClick={onClick}>
      <Icon id={iconId} width={'1.5rem'} height={'1.5rem'} fill={'var(--controls-svg)'} />
      <span className={styles.contextMenuItem__title}>{title}</span>
    </li>
  );
};
