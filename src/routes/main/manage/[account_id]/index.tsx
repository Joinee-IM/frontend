import { Route } from 'react-router-dom';

import { routePath } from '@/constants';
import CreateCourtRoute from '@/routes/main/manage/[account_id]/create/court';
import CreateStadiumRoute from '@/routes/main/manage/[account_id]/create/stadium';
import CreateVenueRoute from '@/routes/main/manage/[account_id]/create/venue';
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
    {CreateVenueRoute}
    {VenueDetailRoute}
    {CreateCourtRoute}
  </Route>
);
