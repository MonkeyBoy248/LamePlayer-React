import Icon from '../Icon';
import styles from './MenuItem.module.scss';

interface MenuItemProps {
  iconId: string;
  title: string;
  onClick: () => void;
}

export const MenuItem = ({ iconId, title, onClick }: MenuItemProps) => {
  return (
    <li className={styles.contextMenuItem__wrapper} onClick={() => onClick()}>
      <Icon
        id={iconId}
        width={'1.5rem'}
        height={'1.5rem'}
        fill={'var(--controls-svg)'}
      />
      <span className={styles.contextMenuItem__title}>{title}</span>
    </li>
  )
}
