import { axiosService, setHeader } from './axiosClient';

interface IRegisterInfo {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  role?: string;
}
interface IParam {
  email: string;
}

interface IQuery {
  page: number;
  limit_per_page: number;
  role: string;
  email?: string;
}

export const getUserApi = (query: IQuery, token?: string) => {
  const url = `/user`;
  const headers = setHeader(token);
  return axiosService.get(url, { headers, params: { ...query } });
};

export const deleteUserApi = (id: number, token?: string) => {
  const url = `/user`;
  const headers = setHeader(token);
  return axiosService.delete(url, { headers, data: { id } });
};

export const createNewUserApi = (registerInfo: IRegisterInfo) => {
  const url = `/user`;
  return axiosService.post(url, registerInfo);
};

export const forgotPasswordApi = (param: IParam) => {
  const url = '/forgot-password';
  return axiosService.post(url, param);
};

export const resetPasswordApi = (token: string, password: string) => {
  const url = `reset-password/${token}`;
  return axiosService.patch(url, { password });
};

export const updateUserApi = (dataUpdate: IRegisterInfo & { id: number | string }, token?: string) => {
  const url = `/user`;
  const headers = setHeader(token);
  return axiosService.patch(url, dataUpdate, { headers });
};

export const importUsersApi = (formData: any, token: string) => {
  const url = `/user/import`;
  const headers = setHeader(token, true);
  return axiosService.post(url, formData, { headers });
};
