import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/provider/i18n';

import '@/index.css';

import { UserProvider } from '@/contexts/useUser';
import CookieProvider from '@/provider/cookie';
import QueryProvider from '@/provider/query';
import RouteProvider from '@/provider/routes';
import ThemeProvider from '@/provider/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookieProvider>
      <QueryProvider>
        <ThemeProvider>
          <UserProvider>
            <RouteProvider />
          </UserProvider>
        </ThemeProvider>
      </QueryProvider>
    </CookieProvider>
  </React.StrictMode>,
);
