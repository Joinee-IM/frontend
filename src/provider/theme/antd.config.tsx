import { ConfigProvider } from 'antd';

import type { ReactNode } from 'react';

import theme from '@/provider/theme/theme';

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 12,
          },
          Tabs: {
            colorPrimary: '#7D97BE',
          },
          Table: {
            headerBorderRadius: 0,
            headerBg: theme.main[100],
            headerSortActiveBg: theme.sub[300],
            headerSortHoverBg: theme.sub[300],
          },
          Radio: {
            buttonSolidCheckedBg: theme.sub[100],
            buttonSolidCheckedColor: theme.sub[500],
            buttonSolidCheckedHoverBg: theme.sub[100],
            colorPrimary: theme.sub[500],
            colorPrimaryHover: theme.sub[500],
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
