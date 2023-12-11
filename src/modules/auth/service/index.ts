import { ENV } from '@/constants';
import api from '@/services';

export const useLogin = () => api.usePost('/api/login');

export const useGoogleLogin = (role?: string) => {
  const googleLogin = () => {
    const query = role ? `?role=${role}` : '';
    window.open(`${ENV.baseURL}/google-login${query}`, '_self');
  };
  return { googleLogin };
};

export const useAddAccount = () => api.usePost('/api/account');

export const useForgetPassword = () => api.usePost('/api/forget-password');

export const useResetPassword = () => api.usePost('/api/reset-password');

export const useReadAccount = (account_id: number) =>
  api.useGet('/api/account/:account_id', { params: { account_id } });

export const useEmailVerification = () => api.usePost('/api/email-verification');

export const useResendEmailVerification = () => api.usePost('/api/email-verification/resend');

export const useLogout = () => api.usePost('/api/logout');
