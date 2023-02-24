import Icon from '@/components/Icon';
import { iconIds } from '@/utils/config/iconIds';
import { FC, MouseEventHandler } from 'react';
import styles from './AddToPlaylistPopupItem.module.scss';

interface AddToPlaylistPopupItemProps {
  inPlaylist?: boolean;
  dataId?: string;
  title: string;
  onClick: MouseEventHandler<HTMLLIElement>;
}

export const AddToPlaylistPopupItem: FC<AddToPlaylistPopupItemProps> = ({
  inPlaylist,
  dataId,
  onClick,
  title,
}: AddToPlaylistPopupItemProps): JSX.Element => {
  const getIcon = (): string => {
    if (inPlaylist) {
      return iconIds.checkmark;
    }

    return iconIds.add;
  };

  return (
    <li className={styles.addToPlaylistPopupItem} data-id={dataId} onClick={onClick}>
      <Icon
        id={getIcon()}
        fill={inPlaylist ? 'var(--checkmark)' : 'var(--controls-svg)'}
        width={'1.5rem'}
        height={'1.5rem'}
      />
      <p className={styles.addToPlaylistPopupItem__title}>{title}</p>
    </li>
  );
};
