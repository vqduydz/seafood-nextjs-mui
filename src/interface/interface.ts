import { SxProps } from '@mui/material';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export interface IUser {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  gender: string;
  place?: string | null;
  avatar: string | null;
  role: string;
  birthday: string | null;
  createdAt: string;
  iat: string;
}

export interface IPlace {
  name?: string;
  phoneNumber?: string;
  address?: string;
  location?: { lat: number; lng: number };
  primary?: boolean;
  place_id?: string;
}

export interface IOrder {
  id?: number;
  deliver_id?: number | null;
  handler_id?: number | null;
  payment_methods?: string;
  order_code?: string;
  customer_id?: number;
  type?: number;
  status?: string;
  payment?: number;
  deposit_amount?: number | null;
  ship_fee?: number | null;
  total_amount?: number;
  total_payment?: number;
  items?: IOrderItems[];
  history?: string;
  place?: IPlace;
  note?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deliver?: IUser | null;
  handler?: IUser | null;
}

export interface IMenuOrder {
  id: number;
  customer_id: number;
  menu_id: number;
  quantity: number;
  name: string;
  slug: string;
  catalog: string;
  catalogSlug: string;
  price: number;
  unit: string;
  max_order: number | null;
  image: string;
  createdAt: string;
}

export interface IOrderItems {
  feedbacked: any;
  catalog: string;
  catalog_slug: string;
  menu_id: number;
  cartItemId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  total: number;
  max_order: number | null;
  catalogSlug: string;
  customer_id: number;
  id: number;
  unit: string;
}

export interface IMenuCreate {
  name: string;
  slug: string;
  catalog: string;
  price: number;
  max_order: number;
  unit: string;
  image: string;
}
export interface IMenuGet {
  id: number;
  name: string;
  slug: string;
  catalog: string;
  catalogSlug: string;
  price: number;
  max_order: number;
  unit: string;
  image: string;
  createdAt?: string;
}

export interface ICatalogCreate {
  name: string;
  slug: string;
  image?: string;
}

export interface ICatalogGet {
  id: number;
  name: string;
  slug: string;
  image?: string;
  createdAt: string;
}

export type ISetState<T> = Dispatch<SetStateAction<T>> | (() => void);
export type ISubmitForm = FormEvent<HTMLFormElement>;
export type SxMui = SxProps;
