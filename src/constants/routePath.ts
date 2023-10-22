import { NestedKeys } from '@/utils/type';

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
  main: '/',
  view: { route: 'view' },
} satisfies Record<string, RoutesType | string>;

export default function getPath(path: NestedKeys<typeof ROUTES>): string {
  const keys = path.split('.');
  const result = search(ROUTES, keys);
  if (typeof result === 'string') return result;
  else return result.route;
}
