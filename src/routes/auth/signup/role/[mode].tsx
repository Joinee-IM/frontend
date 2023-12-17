import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('auth.signup.role')}
    loader={({ params: { mode } }) => {
      if (!['create', 'edit'].includes(mode ?? ''))
        throw new Response('Not Found', { status: 404 });
      return null;
    }}
    lazy={async () => {
      const { Role: Component } = await import('@/modules/auth');
      return { Component };
    }}
  />
);
