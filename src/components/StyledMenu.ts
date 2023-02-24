import styled from '@emotion/styled';
import { MenuProps, Menu } from '@mui/material';

export const StyledMenu = styled(Menu)<MenuProps>({
  '& .MuiPaper-root': {
    backgroundColor: 'var(--context-menu-background)',
    borderRadius: 6,
    marginBottom: '20px',
    minWidth: 180,
    padding: 0,
    '& .MuiMenu-list': {
      transition: 'none',
      padding: '0',
    },
  },
});
