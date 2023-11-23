import { queryKey } from '@/constants';

import api from '@/services';

export const useLogin = () => api.usePost('/login', undefined, { mutationKey: queryKey.login });

export const useGoogleLogin = () => api.useGet('/google-login', undefined, {});

export const useAddAccount = () => api.usePost('/account', undefined, {});

export const useForgetPassword = () => api.usePost('/forget-password', undefined, {});

export const useResetPassword = () => api.usePost('/reset-password', undefined, {});

export const useReadAccount = (account_id: number) =>
  api.useGet('/account/:account_id', { params: { account_id } }, {});

export const useEmailVerification = () => api.usePost('/email-verification', {}, {});

export const useResendEmailVerification = () => api.usePost('/email-verification/resend', {}, {});
