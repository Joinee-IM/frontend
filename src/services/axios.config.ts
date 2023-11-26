import axios, { AxiosError, AxiosResponse } from 'axios';
import { z } from 'zod';

import { ENV } from '@/constants';
import { schemas } from '@/services/type';

type Response = z.infer<(typeof schemas)['Response']>;

const instance = axios.create({ baseURL: ENV.baseURL, withCredentials: true });

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    console.log('req:', `${config.baseURL}${config.url}`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

interface Data {
  data: Record<string, string>;
}

instance.interceptors.response.use(
  function (response: AxiosResponse<Response>) {
    if (response.data.error) throw new Error(response.data.error);
    const data = response.data as Data;
    console.table(data.data);
    return response;
  },
  function ({ response }: AxiosError<Response>) {
    console.error(response?.status, response?.data.error);
    return Promise.reject(new Error(response?.data.error ?? undefined));
  },
);

export default instance;
