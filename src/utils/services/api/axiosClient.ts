import axios from 'axios';

export const axiosService = axios.create({
  baseURL: process.env.apiEndpoint,
});

export const setHeader = (token?: string, isImport?: boolean) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

axiosService.interceptors.request.use(async (config: any) => {
  (config.headers = {
    'Content-type': 'application/json',
    ...config.headers,
  }),
    config.data;

  return config;
});

axiosService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log({ error });

    console.warn(`Lỗi kết nối đến cơ sở dữ liệu, ${error.message}`);
  },
);
