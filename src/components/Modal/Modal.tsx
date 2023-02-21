import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
}

export const Modal = ({isOpen, children, closeModal }: ModalProps) => {
  if (!isOpen) {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '0';

    return null;
  }

  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '17px';

  return createPortal(
    <div className={styles.modal__backdrop} onClick={closeModal}>
      <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('portal')!
  )
}

