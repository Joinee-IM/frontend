import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('entry')}
    lazy={async () => {
      const Entry = await import('@/modules/entry');
      return { Component: Entry.default };
    }}
  />
);
