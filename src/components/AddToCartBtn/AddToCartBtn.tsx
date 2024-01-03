'use client';

import { useMyContext } from '@/context/context';
import { myColors } from '@/styles/color';
import { handleAddToCartApi } from '@/utils/services/api/cartItemApi';
import { AddShoppingCart } from '@mui/icons-material';
import Button, { ButtonProps } from '../Button/Button';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
interface IAddToCartBtn {
  props?: ButtonProps;
  menu_id: number;
}

export default function AddToCartBtn({ props, menu_id }: IAddToCartBtn) {
  const { style: originalStyle, ...otherProps } = props || {};

  const { currentUser, setLoading, handleGetCartItems } = useMyContext();
  const { enqueueSnackbar } = useSnackbar();
  const handleAddCart = async () => {
    // if (setLoading) setLoading({ loading: true });
    try {
      if (currentUser && currentUser.id) {
        const res = await handleAddToCartApi({ customer_id: currentUser?.id, menu_id: menu_id });
        // if (setLoading) setLoading({ loading: false });
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
      // if (setLoading) setLoading({ loading: false });
      console.log(error);
    } finally {
    }
  };

  return (
    <Button
      style={{
        padding: '12px',
        borderRadius: '50%',
        position: 'absolute',
        right: '5%',
        backgroundColor: myColors.primary,
        color: myColors.white,
        ...originalStyle,
      }}
      onClick={handleAddCart}
      {...otherProps}
    >
      <AddShoppingCart />
    </Button>
  );
}
