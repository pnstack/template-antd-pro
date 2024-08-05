import axios from 'axios';
import Cookies from 'js-cookie';

import { StorageKeys } from '@/common/enums';

const request = axios.create({
  baseURL: APP_API_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get(StorageKeys.ACCRESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
