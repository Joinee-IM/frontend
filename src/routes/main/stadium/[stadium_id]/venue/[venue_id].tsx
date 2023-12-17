import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.venue.[venue_id]')}
    lazy={async () => {
      const { Venue: Component } = await import('@/modules/main/pages');
      return { Component };
    }}
  />
);
