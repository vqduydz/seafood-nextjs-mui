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
