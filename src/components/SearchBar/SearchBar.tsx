import { iconIds } from '@/utils/config/iconIds';
import { FC, FormEventHandler } from 'react';
import Icon from '../Icon';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onChange: FormEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  onChange,
  placeholder = 'Search track',
}: SearchBarProps): JSX.Element => {
  return (
    <div className={styles.searchBar}>
      <span className={styles.searchBar__icon}>
        <Icon id={iconIds.search} fill={'var(--controls-svg)'} width={'1.5rem'} height={'1.5rem'} />
      </span>
      <input className={styles.searchBar__input} type="text" onChange={onChange} placeholder={placeholder} />
    </div>
  );
};
