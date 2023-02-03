import { iconIds } from '@/utils/config/iconIds';
import { ReactNode } from 'react';
import Icon from '../Icon';
import { IconButton } from '../IconButton/IconButton';
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
        <IconButton
            iconId={iconIds.close}
            stroke={'#E5E5E5'}
            width={'2rem'}
            height={'2rem'}
            className={styles.dialog__closeButton}
            onClick={closeModal}
        />
      </header>
      {children}
    </Modal>
  )
}
