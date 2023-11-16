import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 12,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}