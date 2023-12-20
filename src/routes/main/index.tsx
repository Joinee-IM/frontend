import { redirect, Route } from 'react-router-dom';

import { routePath } from '@/constants';
import HistoryRoute from '@/routes/main/history/[account_id]';
import ProviderRoute from '@/routes/main/manage/[account_id]';
import PartnerRoute from '@/routes/main/partner';
import ReservationRoute from '@/routes/main/reservation/[mode]';
import CodeRoute from '@/routes/main/reservation/code/[code]';
import VenueRoute from '@/routes/main/stadium/[stadium_id]/venue';
import UserInfoRoute from '@/routes/main/user-info/[account_id]';

const HomeRoute = (
  <Route
    index
    lazy={async () => {
      const { Home: Component } = await import('@/modules/main');
      return { Component };
    }}
  />
);

export default (
  <Route
    path={routePath('main')}
    loader={({ request: { url } }) => {
      const error = new URL(url).searchParams.get('error');
      const account_id = new URL(url).searchParams.get('account_id');
      if (error === 'LoginFailed') {
        return redirect(`/auth/signup/role/edit?account_id=${account_id}`);
      }
      return null;
    }}
    lazy={async () => {
      const Main = await import('@/modules/main');
      return { Component: Main.default };
    }}
  >
    {HomeRoute}
    {PartnerRoute}
    {VenueRoute}
    {CodeRoute}
    {ReservationRoute}
    {UserInfoRoute}
    {HistoryRoute}
    {ProviderRoute}
  </Route>
);
