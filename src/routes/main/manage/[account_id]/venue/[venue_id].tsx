import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.manage.venue')}
    lazy={async () => {
      const Venue = await import('@/modules/lessor/pages/Venue');
      return { Component: Venue.default };
    }}
  />
);
