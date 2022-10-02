import React from 'react';
import styles from './BurgerButton.module.scss'

const BurgerButton = () => {
  return (
    <button className={styles.burgerButton}>
      <span className={styles.burgerButton__line}></span>
      <span className={styles.burgerButton__line}></span>
      <span className={styles.burgerButton__line}></span>
    </button>
  )
}

export default BurgerButton;