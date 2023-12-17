import { Route } from 'react-router-dom';

import { routePath } from '@/constants';
import CreateStadiumRoute from '@/routes/main/manage/[account_id]/create/stadium';
import VenueDetailRoute from '@/routes/main/manage/[account_id]/venue/[venue_id]';

const ProviderRoute = (
  <Route
    index
    lazy={async () => {
      const Court = await import('@/modules/lessor/pages/Manage');
      return { Component: Court.default };
    }}
  />
);

export default (
  <Route path={routePath('main.manage')}>
    {ProviderRoute}
    {CreateStadiumRoute}
    {VenueDetailRoute}
  </Route>
);
