import axios from 'axios';

import type { schemas } from '@/services/type';
import type { AxiosError, AxiosResponse } from 'axios';
import type { z } from 'zod';

import { ENV } from '@/constants';

type Response = z.infer<(typeof schemas)['Response']>;

const instance = axios.create({ baseURL: ENV.baseURL, withCredentials: true });

instance.interceptors.request.use(
  function (config) {
    console.log(config.method, `${config.baseURL}${config.url}`, 'data', config.data);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response: AxiosResponse<Response>) {
    const {
      data: { data, error },
    } = response;
    if (error) throw new Error(error);
    console.table(data);
    return response;
  },
  function ({ response }: AxiosError<Response>) {
    console.error(response?.status, response?.data.error);
    return Promise.reject(new Error(response?.data.error ?? undefined));
  },
);

export default instance;
