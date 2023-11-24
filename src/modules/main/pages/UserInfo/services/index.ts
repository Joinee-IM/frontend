import api from '@/services';

export const useEditAvatar = (account_id: number) =>
  api.usePatch('/account/:account_id/upload', { params: { account_id } }, {});
