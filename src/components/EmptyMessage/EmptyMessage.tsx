import { iconIds } from '@/utils/config/iconIds'
import Icon from '../Icon'
import styles from './EmptyMessage.module.scss'

interface EmptyMessageProps {
  title: string;
  message?: string;
}

export const EmptyMessage = ({ title, message }: EmptyMessageProps) => {
  return (
    <div className={styles.emptyMessage__container}>
      <div className={styles.emptyMessage__dataWrapper}>
        <span className={styles.emptyMessage__icon}>
          <Icon
            id={iconIds.empty}
            width={'5em'}
            height={'5em'}
            fill={'#565656'}
          />
        </span>
        <p className={styles.emptyMessage__title}>{title}</p>
        {
          Boolean(message) ?
            <p className={styles.emptyMessage__text}>{message}</p> :
            null
        }
      </div>
    </div>
  )
}
