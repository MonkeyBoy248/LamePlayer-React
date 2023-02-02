import Icon from '@/components/Icon';
import { iconIds } from '@/utils/config/iconIds';
import { MouseEventHandler } from 'react';
import styles from './PlaylistPopupItem.module.scss';

interface PlaylistPopupItemProps {
  inPlaylist?: boolean;
  dataId?: string;
  title: string;
  onClick: MouseEventHandler<HTMLLIElement>;
}

export const PlaylistPopupItem = ({ inPlaylist, dataId, onClick, title }: PlaylistPopupItemProps) => {
  const getIcon = () => {
    if (inPlaylist) {
      return iconIds.checkmark;
    }

    return iconIds.add;
  }

  return (
    <li className={styles.popupItem} data-id={dataId} onClick={onClick}>
      <Icon
        id={getIcon()}
        fill={ inPlaylist ? '#0E34A0' : '#E5E5E5'}
        width={'1rem'}
        height={'1rem'}
      />
      <p className={styles.popupItem__title}>{title}</p>
    </li>
  )
}
