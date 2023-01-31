import { FocusEventHandler, FormEventHandler, KeyboardEventHandler } from 'react';
import styles from './EditTitleInput.module.scss'

interface EditTitleInput {
  title: string;
  onChange: FormEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

export const EditTitleInput =  ({ title, onChange, onBlur, onKeyDown }: EditTitleInput) => {
  return (
    <input
      className={styles.editTitle__editTitleInput}
      type="text"
      onKeyDown={onKeyDown} onBlur={onBlur}
      value={title}
      onChange={onChange}
      />
  )
}
