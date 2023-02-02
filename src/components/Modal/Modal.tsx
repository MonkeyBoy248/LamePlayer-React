import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
}

export const Modal = ({isOpen, children, closeModal }: ModalProps) => {
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
    <div className={styles.modal__backdrop} onClick={closeModal}>
      <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('portal')!
  )
}

