import { axiosService, setHeader } from './axiosClient';

interface IOrder {
  type: number;
  payment_methods: string;
  order_code: string;
  customer_id: number;
  items: string;
  total_amount: number;
  payment: number;
  ship_fee: number;
  total_payment: number;
  status: string;
  history: string;
  place: string;
  note: string;
}

interface IQuery {
  customer_id?: number;
  order_code?: string;
  status?: string;
  page?: number;
  limit_per_page?: number;
}

export const getOrderApi = ({ query, token }: { query: IQuery; token?: string }) => {
  const url = `/orders`;
  const headers = setHeader(token);
  return axiosService.get(url, { headers, params: { ...query } });
};

export const getOrderByOrderCodeApi = ({ order_code, token }: { order_code: string; token?: string }) => {
  const url = `/order/${order_code}`;
  const headers = setHeader(token);
  return axiosService.get(url, { headers });
};

export const createNewOrderApi = (order: IOrder, token?: string) => {
  const url = `/order`;
  const headers = setHeader(token);
  return axiosService.post(url, order, { headers });
};

// export const updateOrderApi = (dataUpdate) => {
//   const url = `/order`;
//   return axiosService.patch(url, dataUpdate);
// };

export const deleteOrderApi = (id: number, token?: string) => {
  const url = `/order`;
  const headers = setHeader(token);
  return axiosService.delete(url, { headers, data: { id } });
};
