import { TrackModel } from '@/interfaces/Track';
import Icon from '../Icon';
import styles from './ContextMenuItem.module.scss';

interface ContextMenuItemProps {
  iconId: string;
  title: string;
  onClick: () => void;
}

export const ContextMenuItem = ({ iconId, title, onClick }: ContextMenuItemProps) => {
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
