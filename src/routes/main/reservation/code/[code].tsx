import { Route } from 'react-router-dom';

import { routePath } from '@/constants';

export default (
  <Route
    path={routePath('main.code')}
    lazy={async () => {
      const Code = await import('@/modules/main/pages/Reserve/Code');
      return { Component: Code.default };
    }}
  />
);
