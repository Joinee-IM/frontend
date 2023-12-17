import { Route } from 'react-router-dom';

import { routePath } from '@/constants';
import ResetPasswordRoute from '@/routes/auth/forget-password/reset-password';
import SendMailRoute from '@/routes/auth/forget-password/send-mail';

const ForgetPasswordRoute = (
  <Route
    index
    lazy={async () => {
      const ForgetPassword = await import('@/modules/auth/pages/forgetPassword');
      return { Component: ForgetPassword.default };
    }}
  />
);

export default (
  <Route path={routePath('auth.forget-password')}>
    {ForgetPasswordRoute}
    {ResetPasswordRoute}
    {SendMailRoute}
  </Route>
);
