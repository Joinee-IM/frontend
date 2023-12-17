import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.partner')}
    lazy={async () => {
      const Partner = await import('@/modules/main/pages/Partner');
      return { Component: Partner.default };
    }}
  />
);
