import { useSidebarAppearanceDispatch } from '@/contexts/SidebarAppearanceContext';
import { FC } from 'react';
import styles from './BurgerButton.module.scss';
import { SidebarActionKind } from '@/contexts/SidebarAppearanceContext';

const BurgerButton: FC = (): JSX.Element => {
  const dispatch = useSidebarAppearanceDispatch();

  return (
    <button className={styles.burgerButton} onClick={(): void => dispatch({ type: SidebarActionKind.TOGGLE })}>
      <span className={styles.burgerButton__line}></span>
      <span className={styles.burgerButton__line}></span>
      <span className={styles.burgerButton__line}></span>
    </button>
  );
};

export default BurgerButton;
