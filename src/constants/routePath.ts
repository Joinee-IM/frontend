import type { NestedKeys } from '@/utils/type';

interface Path {
  route: string;
}

interface RoutesType extends Record<string, string | RoutesType>, Path {}

function search<T>(target: T, keys: string[]) {
  const key = keys[0] as keyof T;
  const path = target[key];
  if (path === undefined) throw Error('Wrong Path');
  if (typeof path === 'string' || keys.length === 1) return path;
  else return search(path, keys.slice(1));
}

// 對應 routes 裡資料夾的結構 (有畫面才會有路徑)
export const ROUTES = {
  auth: {
    route: 'auth',
    login: 'login',
    signup: {
      route: 'signup',
      role: 'role/:mode',
      account: 'account',
      'send-mail': 'send-mail',
      verified: 'verified',
    },
    'forget-password': {
      route: 'forget-password',
      'send-mail': 'send-mail',
      'reset-password': 'reset-password',
    },
  },
  entry: '/entry',
  main: {
    route: '/',
    partner: 'partner',
    venue: {
      route: 'stadium/:stadium_id/venue',
      '[venue_id]': ':venue_id',
    },
    reservation: { route: 'reservation/:mode', info: ':reservation_id' },
    'user-info': 'user-info/:account_id',
    history: '/history/:account_id',
    manage: {
      route: 'manage/:account_id',
      create: 'create/stadium',
      venue: 'venue/:venue_id',
      'create-venue': 'create/venue',
      'create-court': 'create/court',
    },
  },
  notFound: '*',
  view: { route: 'view' },
} satisfies Record<string, RoutesType | string>;

export default function getPath(path: NestedKeys<typeof ROUTES>): string {
  const keys = path.split('.');
  const result = search(ROUTES, keys);
  if (typeof result === 'string') return result;
  else return result.route;
}
