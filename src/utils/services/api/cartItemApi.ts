import { axiosService } from './axiosClient';

export const getCartItemApi = (customer_id: number) => {
  const url = `/cartitem/${customer_id}`;
  return axiosService.get(url);
};

export const handleAddToCartApi = (cartItem: { customer_id: number; menu_id: number; quantity?: number }) => {
  const url = `/cartitem`;
  return axiosService.post(url, cartItem);
};

export const updateCartItemApi = (dataUpdate: { id?: number; quantity?: number }) => {
  const url = `/cartitem`;
  return axiosService.patch(url, dataUpdate);
};

export const deleteCartItemApi = (id: number) => {
  const url = `/cartitem`;
  return axiosService.delete(url, { data: { id } });
};
