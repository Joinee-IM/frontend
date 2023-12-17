import { Route } from 'react-router-dom';

import { routePath } from '@/constants';
import VenueDetailRoute from '@/routes/main/stadium/[stadium_id]/venue/[venue_id]';

const VenueListRoute = (
  <Route
    index
    lazy={async () => {
      const { VenueList: Component } = await import('@/modules/main/pages');
      return { Component };
    }}
  />
);

export default (
  <Route path={routePath('main.venue')}>
    {VenueListRoute}
    {VenueDetailRoute}
  </Route>
);
