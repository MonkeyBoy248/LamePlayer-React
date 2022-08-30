import React from 'react';
import sprite from '../assets/icons/sprite.svg';
import { Svg } from '../interfaces/Svg';

const Icon = ({id, blockName, width, height, fill}: Svg) => {
  return (
    <svg
      className={`${blockName}__${id}`}
      width={width}
      height={height}
      fill={fill? fill : undefined}
    >
      <use href={`${sprite}#${id}`}></use>
    </svg>
  )
}

export default Icon;