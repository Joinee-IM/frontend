import { CookiesProvider } from 'react-cookie';

import type { ReactCookieProps } from 'react-cookie';

export default function CookieProvider({ children }: Pick<ReactCookieProps, 'children'>) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
