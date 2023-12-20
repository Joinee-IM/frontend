import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.manage.create-venue')}
    lazy={async () => {
      const CreateVenue = await import('@/modules/lessor/pages/Upload/Venue');
      return { Component: CreateVenue.default };
    }}
  />
);
