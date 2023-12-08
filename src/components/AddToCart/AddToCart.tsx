'use client';

import { AddShoppingCart } from '@mui/icons-material';
import { CSSProperties } from 'react';
import Button from '../Button/Button';

interface IAddToCart {
  style?: CSSProperties;
  handleAddToCart?: () => {};
  iconSize?: string | number;
}
export default function AddToCart({ style, handleAddToCart, iconSize }: IAddToCart) {
  return (
    <Button
      onClick={handleAddToCart}
      primary
      style={{
        padding: '12px',
        borderRadius: '50%',
        position: 'absolute',
        right: '5%',
        ...style,
      }}
    >
      <AddShoppingCart sx={{ fontSize: iconSize }} />
    </Button>
  );
}
