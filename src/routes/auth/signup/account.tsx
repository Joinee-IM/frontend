import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('auth.signup.account')}
    lazy={async () => {
      const { Signup: Component } = await import('@/modules/auth');
      return { Component };
    }}
  />
);
