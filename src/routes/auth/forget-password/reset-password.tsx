import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('auth.forget-password.reset-password')}
    lazy={async () => {
      const ResetPassword = await import('@/modules/auth/pages/forgetPassword/ResetPassword');
      return { Component: ResetPassword.default };
    }}
  />
);
