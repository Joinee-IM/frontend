import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('auth.login')}
    lazy={async () => {
      const { Login: Component } = await import('@/modules/auth');
      return { Component };
    }}
  />
);
