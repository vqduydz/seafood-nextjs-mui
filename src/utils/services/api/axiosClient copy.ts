import axios from 'axios';
import CryptoJS from 'crypto-js';

const getOriginalToken = () => {
  const secretKey: string = process.env.secretKey as string;
  const localStorageItems = localStorage.getItem('persist:root');
  if (localStorageItems) {
    const localStorageItemsParse = JSON.parse(localStorageItems);
    const EncryptedToken = JSON.parse(localStorageItemsParse.auth).token;

    if (!EncryptedToken || typeof EncryptedToken !== 'string') {
      return null;
    }
    const decryptedBytes = CryptoJS.AES.decrypt(EncryptedToken, secretKey);
    const OriginalToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return OriginalToken;
  }
  return null;
};

// // Add a request interceptor

// axiosService.interceptors.request.use(
//   async (config) => {
//     // Do something before request is sent
//     const token = getOriginalToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

// // Add a response interceptor
// axiosService.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     console.log({ error });
//     throw error.response.data;
//   },
// );

export const axiosService = axios.create({
  baseURL: process.env.apiEndpoint,
});

axiosService.interceptors.request.use(async (config: any) => {
  const token = getOriginalToken();
  config.headers['Content-type'] = 'application/json';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.data;
  return config;
});

// axiosService.interceptors.response.use(
//   (response) => response.data,
//   (error) => error,
// );

axiosService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(`Lỗi kết nối đến cơ sở dữ liệu, ${error}`);
  },
);
