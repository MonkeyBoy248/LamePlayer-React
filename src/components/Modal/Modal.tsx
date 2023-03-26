import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  closeModal: () => void;
}

export const Modal: FC<ModalProps> = ({ children, closeModal }: ModalProps): JSX.Element | null => {
  return createPortal(
    <div className={styles.modal__backdrop} onClick={closeModal}>
      <div className={styles.modal__content} onClick={(e): void => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};
