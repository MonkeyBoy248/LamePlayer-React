import { MouseEventHandler, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../Modal/Modal';
import styles from './AlertModal.module.scss';

interface AlertModalProps {
  isOpen: boolean;
  title?: string;
  text: string;
  confirmText: string;
  cancelText: string;
  closeModal: () => void;
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
    closeModal,
    onConfirm,
    onCancel
  }: AlertModalProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
       {
          title && <h3 className={styles.alertModal__title}>{title}</h3>
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
    </Modal>
  )
}
