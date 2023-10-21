// services are for api connection
import { ZodiosHooks } from '@zodios/react';

import axios from './axios.config';
import { createApiClient } from './type';

const api = new ZodiosHooks('api', createApiClient('/api', { axiosInstance: axios }));

export default api;
