import { Route } from 'react-router-dom';

import { routePath } from '@/constants';
import ReservationInfoRoute from '@/routes/main/reservation/[mode]/[reservation_id]';

const ReservationRoute = (
  <Route
    index
    lazy={async () => {
      const { Reserve: Component } = await import('@/modules/main/pages');
      return { Component };
    }}
  />
);

export default (
  <Route
    path={routePath('main.reservation')}
    loader={({ params: { mode } }) => {
      if (!['create', 'edit', 'info'].includes(mode ?? ''))
        throw new Response('Not Found', { status: 404 });
      return null;
    }}
  >
    {ReservationRoute}
    {ReservationInfoRoute}
  </Route>
);
