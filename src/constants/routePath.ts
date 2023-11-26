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

export const ROUTES = {
  index: {
    route: '/',
    stadium: { route: '/', venue: 'stadium/:stadium_id/venue' },
    'user-info': 'user-info/:account_id',
  },
  entry: '/entry',
  auth: {
    route: 'auth',
    login: 'login',
    signup: {
      route: 'signup',
      'choose-role': 'choose-role',
      account: 'account',
      'send-mail': 'send-mail',
      success: 'success',
      'more-info': 'more-info',
    },
    forgetPassword: {
      route: 'forget-password',
      'send-mail': 'send-mail',
      'reset-password': 'reset-password',
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
