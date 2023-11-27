import axios, { AxiosError, AxiosResponse } from 'axios';
import { z } from 'zod';

import { ENV } from '@/constants';

import { schemas } from '@/services/type';

type Response = z.infer<(typeof schemas)['Response']>;

const instance = axios.create({ baseURL: ENV.baseURL, withCredentials: true });

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // const [cookies] = useCookies<string, { token?: string }>(['token']);
    // config.headers.Authorization = cookies.token;
    console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response: AxiosResponse<Response>) {
    if (response.data.error) throw new Error(response.data.error);
    return response;
  },
  function ({ response }: AxiosError<Response>) {
    console.error(response?.status, response?.data.error);
    return Promise.reject(new Error(response?.data.error ?? undefined));
  },
);

export default instance;
