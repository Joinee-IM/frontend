import { ENV, queryKey } from '@/constants';
import api from '@/services';

export const useLogin = () => api.usePost('/api/login', undefined, { mutationKey: queryKey.login });

export const useGoogleLogin = (role?: string) => {
  const googleLogin = () => {
    const query = role ? `?role=${role}` : '';
    window.open(`${ENV.baseURL}/google-login${query}`, '_self');
  };
  return { googleLogin };
};

export const useAddAccount = () => api.usePost('/api/account', undefined, {});

export const useForgetPassword = () => api.usePost('/api/forget-password', undefined, {});

export const useResetPassword = () => api.usePost('/api/reset-password', undefined, {});

export const useReadAccount = (account_id: number) =>
  api.useGet('/api/account/:account_id', { params: { account_id } }, {});

export const useEmailVerification = () => api.usePost('/api/email-verification', {}, {});

export const useResendEmailVerification = () =>
  api.usePost('/api/email-verification/resend', {}, {});
