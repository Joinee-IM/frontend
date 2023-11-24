import { useCookies } from 'react-cookie';

import api from '@/services';

export const useUserInfo = (account_id: number) => {
  const [cookie] = useCookies<string, { 'auth-token'?: string }>(['auth-token']);
  return api.useGet('/account/:account_id', {
    params: { account_id },
    headers: { token: cookie['auth-token'] },
  });
};

export const useEditAvatar = (account_id: number) =>
  api.usePatch('/account/:account_id/upload', { params: { account_id } }, {});
