import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('auth.forget-password.send-mail')}
    lazy={async () => {
      const SendMail = await import('@/modules/auth/pages/forgetPassword/SendMail');
      return { Component: SendMail.default };
    }}
  />
);
