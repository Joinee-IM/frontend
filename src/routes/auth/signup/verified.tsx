import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('auth.signup.verified')}
    lazy={async () => {
      const { Verified: Component } = await import('@/modules/auth');
      return { Component };
    }}
  />
);
