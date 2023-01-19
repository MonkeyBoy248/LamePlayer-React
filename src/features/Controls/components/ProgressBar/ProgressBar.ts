import Slider, { SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const ProgressBar = styled(Slider)<SliderProps>({
  color: '#0FA750',
  height: '0.8rem',
  borderRadius: 0,
  padding: 0,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#E5E5E5',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#E5E5E5',
    boxShadow: 'none',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'none',
      border: '2px solid currentColor',
    }
  }
});