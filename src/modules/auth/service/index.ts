import { queryKey } from '@/constants';

import api from '@/services';

export const useLogin = () => api.usePost('/login', undefined, { mutationKey: queryKey.login });
