import Slider, { SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const VolumeSlider = styled(Slider)<SliderProps>({
  color: 'var(--accent)',
  width: '8rem',
  height: 5,
  position: 'relative',
  '&::before, &::after': {
    content: '""',
    width: 1,
    height: 5,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'var(--controls-svg)',
    zIndex: -1,
  },
  '&::before': {
    top: 4,
  },
  '&::after': {
    bottom: 4,
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    backgroundColor: 'var(--range-rail)',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: 'var(--range-thumb)',
    boxShadow: 'none',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'none',
      border: '2px solid currentColor',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    width: 24,
    height: 24,
    color: '#201F1F',
    backgroundColor: 'var(--range-thumb)',
    top: -8,

    '&::before': {
      display: 'none',
    },
  },
});
