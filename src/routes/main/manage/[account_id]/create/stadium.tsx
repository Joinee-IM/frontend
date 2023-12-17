import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.manage.create')}
    lazy={async () => {
      const CreateStadium = await import('@/modules/lessor/pages/Upload/Stadium');
      return { Component: CreateStadium.default };
    }}
  />
);
