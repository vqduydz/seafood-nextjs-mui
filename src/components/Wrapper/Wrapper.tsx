'use client';
import { SxMui } from '@/interface/interface';
import { styled } from '@mui/system';

interface WrapperProps {
  // Mui
  sx?: SxMui;
  className?: string;
  children?: React.ReactNode;
}

export function Wrapper({ children, sx, className }: WrapperProps) {
  const baseStyle = {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  };

  const StyledWrapper = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
      maxWidth: '768px',
      paddingRight: '0.5rem',
      paddingLeft: '0.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '992px',
      paddingRight: '1.4rem',
      paddingLeft: '1.4rem',
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: '1200px',
    },
    [theme.breakpoints.up('xxl')]: {
      maxWidth: '1440px',
      paddingRight: '1.8rem',
      paddingLeft: '1.8rem',
    },
  }));

  const classes = [className].filter(Boolean).join(' ');
  return (
    <StyledWrapper className={classes} sx={{ ...baseStyle, ...sx }}>
      {children}
    </StyledWrapper>
  );
}
