import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.reservation.info')}
    lazy={async () => {
      const { Reserve: Component } = await import('@/modules/main/pages');
      return { Component };
    }}
  />
);
