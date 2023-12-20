import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.manage.venue')}
    lazy={async () => {
      const Detail = await import('@/modules/main/pages/Detail');
      return { Component: Detail.default };
    }}
  />
);
