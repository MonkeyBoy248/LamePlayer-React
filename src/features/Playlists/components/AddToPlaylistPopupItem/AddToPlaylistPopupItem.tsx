import Icon from '@/components/Icon';
import { iconIds } from '@/utils/config/iconIds';
import { MouseEventHandler } from 'react';
import styles from './AddToPlaylistPopupItem.module.scss';

interface AddToPlaylistPopupItemProps {
  inPlaylist?: boolean;
  dataId?: string;
  title: string;
  onClick: MouseEventHandler<HTMLLIElement>;
}

export const AddToPlaylistPopupItem = ({ inPlaylist, dataId, onClick, title }: AddToPlaylistPopupItemProps) => {
  const getIcon = () => {
    if (inPlaylist) {
      return iconIds.checkmark;
    }

    return iconIds.add;
  }

  return (
    <li className={styles.addToPlaylistPopupItem} data-id={dataId} onClick={onClick}>
      <Icon
        id={getIcon()}
        fill={ inPlaylist ? '#61BDE5' : '#E5E5E5' }
        width={'1.5rem'}
        height={'1.5rem'}
      />
      <p className={styles.addToPlaylistPopupItem__title}>{title}</p>
    </li>
  )
}
