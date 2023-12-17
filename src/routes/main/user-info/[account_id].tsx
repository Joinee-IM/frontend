import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.user-info')}
    lazy={async () => {
      const { UserInfo: Component } = await import('@/modules/main/pages');
      return { Component };
    }}
  />
);
