import { createRoutesFromElements, Route } from 'react-router-dom';

import NotFound from '@/modules/notFound';
import AuthRoute from '@/routes/auth';
import EntryRoute from '@/routes/entry';
import MainRoute from '@/routes/main';

const router = createRoutesFromElements(
  <Route path="/" errorElement={<NotFound />}>
    {EntryRoute}
    {AuthRoute}
    {MainRoute}
  </Route>,
);

export default router;
