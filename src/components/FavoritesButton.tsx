import { iconIds } from '@/utils/config/iconIds';
import React from 'react'
import Icon from './Icon';
import { IconButton } from './IconButton';

interface FavoritesButtonProps {
  height: string;
  width: string;
  fill?: string;
  stroke?: string;
  blockName: string;
}

export const FavoritesButton = ({ height, width, blockName, fill, stroke }: FavoritesButtonProps) => {
  return (
      <IconButton
        className={`${blockName}__favoritesButton`}
        iconId={iconIds.like}
        width={width}
        height={height}
        blockName={blockName}
        fill={fill}
        stroke={stroke}
        onClick={(e) => console.log(e)}
      />
  )
}
