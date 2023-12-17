import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('auth.signup.send-mail')}
    lazy={async () => {
      const { SendMail: Component } = await import('@/modules/auth');
      return { Component };
    }}
  />
);
