import { iconIds } from '@/utils/config/iconIds';
import { FC } from 'react';
import Icon from '../Icon';
import styles from './EmptyMessage.module.scss';

interface EmptyMessageProps {
  title: string;
  message?: string;
}

export const EmptyMessage: FC<EmptyMessageProps> = ({ title, message }: EmptyMessageProps): JSX.Element => {
  return (
    <div className={styles.emptyMessage__container}>
      <div className={styles.emptyMessage__dataWrapper}>
        <span className={styles.emptyMessage__icon}>
          <Icon id={iconIds.empty} width={'5em'} height={'5em'} fill={'#565656'} />
        </span>
        <p className={styles.emptyMessage__title}>{title || 'Nothing found'}</p>
        {message ? <p className={styles.emptyMessage__text}>{message}</p> : null}
      </div>
    </div>
  );
};
