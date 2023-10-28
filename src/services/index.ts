// services are for api connection
import { ZodiosHooks } from '@zodios/react';

import axios from '@/services/axios.config';
import { createApiClient } from '@/services/type';

const api = new ZodiosHooks(
  'api',
  createApiClient(String(import.meta.env.VITE_API_PORT), {
    axiosInstance: axios,
  }),
);

export default api;
