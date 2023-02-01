import { MouseEventHandler, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './AlertModal.module.scss';

interface AlertModalProps {
  isOpen: boolean;
  title?: string;
  text: string;
  confirmText: string;
  cancelText: string;
  backdropOnClick: MouseEventHandler<HTMLDivElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
}

export const AlertModal = (
  {
    isOpen,
    title,
    text,
    confirmText,
    cancelText,
    backdropOnClick,
    onConfirm,
    onCancel
  }: AlertModalProps) => {
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    }
  }, [])

  if (!isOpen) {
    document.body.style.overflow = ''

    return null;
  }
  
  document.body.style.overflow = 'hidden';

  return createPortal(
    <div className={styles.alertModal__backdrop} onClick={backdropOnClick}>
      <div className={styles.alertModal__content} onClick={(e) => e.stopPropagation()}>
        {
          title && <h2 className={styles.alertModal__title}>{title}</h2>
        }
        <p className={styles.alertModal__text}>{text}</p>
        <footer className={styles.alertModal__controlsWrapper}>
          <button
            className={`${styles.alertModal__button} ${styles.alertModal__button_confirm}`}
            onClick={onConfirm}
            >
              {confirmText}
            </button>
          <button
            className={`${styles.alertModal__button} ${styles.alertModal__button_cancel}`}
            onClick={onCancel}
            >
              {cancelText}
            </button>
        </footer>
      </div>
    </div>,
    document.getElementById('portal')!
  )
}
