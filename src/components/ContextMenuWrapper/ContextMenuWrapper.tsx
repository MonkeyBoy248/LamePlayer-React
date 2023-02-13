import { ReactNode } from 'react';
import styles from './ContextMenuWrapper.module.scss';

type Placement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end';

interface ContextMenuWrapperProps {
  children: ReactNode;
  placement?: Placement;
  isOpen: boolean;
}

interface Position {
  [key: string]: string;
}

export const ContextMenuWrapper = ({ placement, children, isOpen }: ContextMenuWrapperProps) => {
  if (!isOpen) {
    return null;
  }

  const position: Position = {
    'top': styles.contextMenuWrapper_top,
    'bottom': styles.contextMenuWrapper_bottom,
    'right': styles.contextMenuWrapper_right,
    'left': styles.contextMenuWrapper_left,
    'top-start': styles.contextMenuWrapper_topStart,
    'top-end': styles.contextMenuWrapper_topEnd
  }

  const getPlacement = (): string => {
    if (!placement) {
      return position['top'];
    }

    return position[placement];
  }

  return (
    <ul className={`${styles.contextMenuWrapper} ${getPlacement()}`}>
      {children}
    </ul>
  )
}
