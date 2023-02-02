import { iconIds } from '@/utils/config/iconIds';
import { ReactNode } from 'react';
import Icon from '../Icon';
import { Modal } from '../Modal/Modal';
import styles from './DialogModal.module.scss';

interface DialogModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  title: string;
}

export const DialogModal = ({ isOpen, closeModal, children, title }: DialogModalProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <header className={styles.dialog__header}>
        <h3 className={styles.dialog__title}>{title}</h3>
        <button className={styles.dialog__closeButton}>
          <Icon
            id={iconIds.close}
            stroke={'#E5E5E5'}
            width={'1rem'}
            height={'1rem'}
          />
        </button>
      </header>
      {children}
    </Modal>
  )
}
