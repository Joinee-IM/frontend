import { ThemeProvider as Provider } from 'styled-components';

import type { ReactNode } from 'react';

import AntdProvider from '@/provider/theme/antd.config';
import theme from '@/provider/theme/theme';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Provider theme={theme}>
      <AntdProvider>{children}</AntdProvider>
    </Provider>
  );
}
