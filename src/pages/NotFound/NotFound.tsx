import Icon from '@/components/Icon';
import { iconIds } from '@/utils/config/iconIds';
import { FC } from 'react';
import styles from './NotFound.module.scss';

export const NotFound: FC = (): JSX.Element => {
  return (
    <section className={`notFound _page`}>
      <div className={`notFound__inner _container`}>
        <header className={styles.notFound__header}>
          <h2 className={`styles.notFound__title _pageTitle`}>Page not found</h2>
          <Icon id={iconIds.warning} width={'2rem'} height={'2rem'} fill={'var(--text)'} />
        </header>
        <div className={`notFound__content`}>
          <div className={styles.notFound__textWrapper}>
            <p className={styles.notFound__text}>Page does not exist.</p>
            <p className={styles.notFound__text}>It was probably caused by a typo or an incorrect keyboard layout.</p>
            <p className={styles.notFound__text}>You can return to existing sections using the navigation menu.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
