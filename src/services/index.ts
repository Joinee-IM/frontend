// services are for api connection
import { ZodiosHooks } from '@zodios/react';

import axios from '@/services/axios.config';
import { createApiClient } from '@/services/type';

const api = new ZodiosHooks('api', createApiClient('/api', { axiosInstance: axios }));

export default api;
