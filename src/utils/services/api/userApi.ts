import { axiosService } from './axiosClient';

interface IRegisterInfo {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export const createNewUserApi = (registerInfo: IRegisterInfo) => {
  const url = `/user`;
  return axiosService.post(url, registerInfo);
};

interface IParam {
  email: string;
}
export const forgotPasswordApi = (param: IParam) => {
  const url = '/forgot-password';
  return axiosService.post(url, param);
};

export const resetPasswordApi = (token: string, password: string) => {
  const url = `reset-password/${token}`;
  return axiosService.patch(url, { password });
};
