import { MouseEventHandler } from 'react';
import Icon from './Icon';

interface IconButtonProps {
  iconId: string;
  height: string;
  width: string;
  fill?: string;
  stroke?: string;
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

export const IconButton = (
  {
    iconId,
    height,
    width,
    fill,
    stroke,
    className,
    isDisabled,
    onClick
  }: IconButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      <Icon
        id={iconId}
        height={height}
        width={width}
        fill={fill}
        stroke={stroke}
      />
    </button>
  )
}
