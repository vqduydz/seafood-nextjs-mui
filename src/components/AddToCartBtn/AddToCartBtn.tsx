'use client';

import { useMyContext } from '@/context/context';
import { myColors } from '@/styles/color';
import { handleAddToCartApi } from '@/utils/services/api/cartItemApi';
import { AddShoppingCart } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import Button, { ButtonProps } from '../Button/Button';
import { ReactNode } from 'react';
interface IAddToCartBtn {
  props?: ButtonProps;
  menu_id: number;
  main?: boolean;
  children?: ReactNode;
}

export default function AddToCartBtn({ props, menu_id, main, children }: IAddToCartBtn) {
  const { style: originalStyle, ...otherProps } = props || {};
  const { currentUser, handleGetCartItems } = useMyContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddCart = async () => {
    try {
      if (currentUser && currentUser.id) {
        const res = await handleAddToCartApi({ customer_id: currentUser?.id, menu_id: menu_id });
        if (res.data && res.data.error) {
          enqueueSnackbar(res.data.error as string, { variant: 'error' });
        }
        if (res.data && res.data.message) {
          if (handleGetCartItems) handleGetCartItems();
          enqueueSnackbar(res.data.message as string, { variant: 'success' });
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      style={
        children
          ? { ...originalStyle }
          : {
              padding: '12px',
              borderRadius: '50%',
              position: 'absolute',
              right: '5%',
              backgroundColor: myColors.primary,
              color: myColors.white,
              ...originalStyle,
            }
      }
      onClick={handleAddCart}
      {...otherProps}
    >
      {children ? children : <AddShoppingCart />}
    </Button>
  );
}
