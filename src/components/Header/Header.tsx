import React from 'react';
import BurgerButton from '../BurgerButton/BurgerButton';
import styles from './Header.module.scss';
import Logo from '../Logo';
import '../../styles/_fonts.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.header__inner} _container`}>
          <BurgerButton></BurgerButton>
          <div className={styles.header__logoWrapper}>
            <Logo width={'60'} height={'60'}></Logo>
            <h1 className={styles.header__pageTitle}>LamePlayer</h1>
          </div>
        </div>
    </header>
  )
}

export default Header;