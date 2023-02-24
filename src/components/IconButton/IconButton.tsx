import { FC, MouseEventHandler } from 'react';
import styles from './IconButton.module.scss';
import Icon from '../Icon';

interface IconButtonProps {
  iconId: string;
  height: string;
  width: string;
  fill?: string;
  stroke?: string;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

export const IconButton: FC<IconButtonProps> = ({
  iconId,
  height,
  width,
  fill,
  stroke,
  className,
  isDisabled,
  onClick,
}: IconButtonProps): JSX.Element => {
  return (
    <button className={`${styles.iconButton} ${className}`} onClick={onClick} disabled={isDisabled}>
      <Icon id={iconId} height={height} width={width} fill={fill} stroke={stroke} />
    </button>
  );
};
