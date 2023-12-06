// services are for api connection
import { ZodiosHooks } from '@zodios/react';

import { ENV } from '@/constants';
import axios from '@/services/axios.config';
import { createApiClient } from '@/services/type';

const api = new ZodiosHooks(
  'api',
  createApiClient(ENV.baseURL, {
    axiosInstance: axios,
  }),
);

export default api;
