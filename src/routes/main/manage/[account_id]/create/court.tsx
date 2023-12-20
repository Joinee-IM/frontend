import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.manage.create-court')}
    lazy={async () => {
      const CreateCourt = await import('@/modules/lessor/pages/Upload/Court');
      return { Component: CreateCourt.default };
    }}
  />
);
