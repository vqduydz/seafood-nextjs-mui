'use client';
import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import NorthIcon from '@mui/icons-material/North';

export default function ScrollTopBtn() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Button
      outline
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      style={{
        zIndex: 9999,
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        padding: '5px 5px',
        borderRadius: '50%',
        opacity: showButton ? 1 : 0,
        transition: 'opacity 1.5s ease',
        visibility: showButton ? 'visible' : 'hidden',
      }}
    >
      <NorthIcon />
    </Button>
  );
}
