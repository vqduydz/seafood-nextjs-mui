import { IMenuCreate, IMenuGet } from '@/interface/interface';
import { axiosService, setHeader } from './axiosClient';

interface menuApiQuery {
  page?: number;
  limit_per_page?: number;
  slug?: string;
}

export const menuApi = (query?: menuApiQuery) => {
  const url = '/menu';
  return axiosService.get(url, { params: { ...query } });
};

export const createNewMenugApi = (menuData: IMenuCreate, token: string) => {
  const url = '/menu';
  const headers = setHeader(token);
  return axiosService.post(url, menuData, { headers });
};

export const updateMenuApi = (dataUpdate: IMenuGet, token: string) => {
  const url = '/menu';
  const headers = setHeader(token);
  return axiosService.patch(url, dataUpdate, { headers });
};

export const deleteMenuApi = (id: number, token: string) => {
  const url = '/menu';
  const headers = setHeader(token);
  return axiosService.delete(url, { headers, data: { id } });
};

export const importMenusApi = (formData: any, token: string) => {
  const url = '/menu/import';
  const headers = setHeader(token, true);
  return axiosService.post(url, formData, { headers });
};
