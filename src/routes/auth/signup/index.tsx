import { Route } from 'react-router-dom';

import { routePath } from '@/constants';
import AccountRoute from '@/routes/auth/signup/account';
import RoleRoute from '@/routes/auth/signup/role/[mode]';
import SendMailRoute from '@/routes/auth/signup/send-mail';
import VerifiedRoute from '@/routes/auth/signup/verified';

export default (
  <Route path={routePath('auth.signup')}>
    {RoleRoute}
    {AccountRoute}
    {SendMailRoute}
    {VerifiedRoute}
  </Route>
);
