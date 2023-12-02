import { Tabs as AntdTabs } from 'antd';

import type { TabsProps as AntdTabProps } from 'antd';
import type { ReactNode } from 'react';

type TabItemProps = Exclude<AntdTabProps['items'], undefined>[number] & {
  index: string;
  children: ReactNode;
};

interface TabsProps extends Omit<AntdTabProps, 'children'> {
  children: { props: TabItemProps } | { props: TabItemProps }[];
}

export const TabPane = (props: TabItemProps) => {
  return { ...props, type: '', props: '' };
};

export const Tabs = ({ children, ...rest }: TabsProps) => {
  return (
    <AntdTabs
      {...rest}
      items={[children].flat().map(({ props }) => ({
        label: props.label,
        key: props.index,
        children: props.children,
        style: props.style,
      }))}
    />
  );
};
