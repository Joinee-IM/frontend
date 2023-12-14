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

// 對應 modules 裡資料夾的結構
export const ROUTES = {
  index: {
    route: '/',
    stadium: {
      route: '/',
      venue: { route: 'stadium/:stadium_id/venue', detail: ':venue_id' },
    },
    'user-info': 'user-info/:account_id',
    reserve: { route: 'reserve/:mode', info: ':reservation_id' },
  },
  entry: '/entry',
  auth: {
    route: 'auth',
    login: 'login',
    signup: {
      route: 'signup',
      role: 'role/:mode',
      account: 'account',
      'send-mail': 'send-mail',
      success: 'success',
    },
    forgetPassword: {
      route: 'forget-password',
      'send-mail': 'send-mail',
      'reset-password': 'reset-password',
    },
  },
  history: '/history/:account_id',
  lessor: {
    route: '/',
    manage: {
      route: 'manage/:account_id',
      venue: 'venue/:venue_id',
      create: { route: 'create', stadium: 'stadium' },
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
