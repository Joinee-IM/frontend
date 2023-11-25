import api from '@/services';

export const useUserInfo = (account_id: number) =>
  api.useGet('/account/:account_id', {
    params: { account_id },
  });

export const useEditAvatar = (account_id: number) =>
  api.usePatch('/account/:account_id/upload', { params: { account_id } }, {});
