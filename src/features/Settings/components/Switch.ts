import { Switch, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomSwitch = styled(Switch)<SwitchProps>({
  width: 64,
  height: 32,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(32px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#0FA750',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#0FA750',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: '#E5E5E5',
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.8,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 28,
    height: 28,
  },
  '& .MuiSwitch-track': {
    borderRadius: 30,
    backgroundColor: '#565656',
    opacity: 1,
  },
});
