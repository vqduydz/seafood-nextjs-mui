'use client';
import { styled } from '@mui/system';
import React from 'react';

interface InnerProps {
  sx?: Record<string, any>;
  className?: string;
  children?: React.ReactNode;
}

// Đặt tên khác nhau cho kiểu và biến
const StyledInner = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    maxWidth: '768px',
    paddingRight: '0.1rem',
    paddingLeft: '0.1rem',
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

export function Inner({ children, sx, className }: InnerProps) {
  const baseStyle = {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
  };

  const classes = [className].filter(Boolean).join(' ');
  return (
    <StyledInner className={classes} sx={{ ...baseStyle, ...sx }}>
      {children}
    </StyledInner>
  );
}
