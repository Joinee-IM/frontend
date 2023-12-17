import { Route } from 'react-router-dom';

import { ENV, routePath } from '@/constants';
import ForgetPasswordRoute from '@/routes/auth/forget-password';
import LoginRoute from '@/routes/auth/login';
import SignUpRoute from '@/routes/auth/signup';

export default (
  <Route
    path={routePath('auth')}
    loader={({ request: { url } }) => {
      if (!/^\/auth\/[^]+$/.test(url.replace(ENV.domain, '')))
        // not allowed exact /auth || /auth/
        throw new Response('', {
          status: 404,
        });
      return null;
    }}
    lazy={async () => {
      const Auth = await import('@/modules/auth');
      return { Component: Auth.default };
    }}
  >
    {LoginRoute}
    {SignUpRoute}
    {ForgetPasswordRoute}
  </Route>
);
