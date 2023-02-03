import sprite from '../assets/icons/sprite.svg';
import { Svg } from '../interfaces/Svg';

const Icon = ({id, width, height, fill, stroke}: Svg) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
    >
      <use href={`${sprite}#${id}`}></use>
    </svg>
  )
}

export default Icon;