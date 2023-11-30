import axios from 'axios';

import type { schemas } from '@/services/type';
import type { AxiosError, AxiosResponse } from 'axios';
import type { z } from 'zod';

import { ENV } from '@/constants';

type Response = z.infer<(typeof schemas)['Response']>;

const instance = axios.create({ baseURL: ENV.baseURL, withCredentials: true });
const ignorePath = ['/album'];

instance.interceptors.request.use(
  function (config) {
    if (!ignorePath.includes(config.url ?? ''))
      console.log('req:', `${config.baseURL}${config.url}`);
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
    if (!ignorePath.includes(response.config.url ?? '')) console.table(data);
    return response;
  },
  function ({ response }: AxiosError<Response>) {
    console.error(response?.status, response?.data.error);
    return Promise.reject(new Error(response?.data.error ?? undefined));
  },
);

export default instance;
