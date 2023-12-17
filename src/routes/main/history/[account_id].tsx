import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.history')}
    lazy={async () => {
      const History = await import('@/modules/history');
      return { Component: History.default };
    }}
  />
);
