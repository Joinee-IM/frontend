import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/provider/i18n';

import '@/index.css';

import QueryProvider from '@/provider/query';
import RouteProvider from '@/provider/routes';
import ThemeProvider from '@/provider/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <RouteProvider />
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>,
);
