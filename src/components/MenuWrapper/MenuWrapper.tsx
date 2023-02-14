import { useClickOutside } from '@/utils/hooks/useClickOutside';
import { ReactNode } from 'react';
import styles from './MenuWrapper.module.scss';

type Placement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end';

interface MenuWrapperProps {
  children: ReactNode;
  placement?: Placement;
  isOpen: boolean;
  onClickOutside: () => void;
}

interface Position {
  [key: string]: string;
}

export const MenuWrapper = ({ placement, children, isOpen, onClickOutside }: MenuWrapperProps) => {
  const ref = useClickOutside<HTMLUListElement>(onClickOutside);

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
    <ul ref={ref} className={`${styles.contextMenuWrapper} ${getPlacement()}`}>
      {children}
    </ul>
  )
}
