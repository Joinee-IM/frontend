import { Tabs as AntdTabs } from 'antd';

import type { TabsProps as AntdTabProps } from 'antd';
import type { ReactNode } from 'react';

type TabItemProps = Exclude<AntdTabProps['items'], undefined>[number] & {
  index: string;
  children: ReactNode;
};

interface TabsProps extends Omit<AntdTabProps, 'children'> {
  children: { props: TabItemProps } | ({ props: TabItemProps } | null | undefined)[];
}

export const TabPane = (props: TabItemProps) => {
  return { ...props, type: '', props: '' };
};

export const Tabs = ({ children, ...rest }: TabsProps) => {
  const tabs = [children].flat().filter((item) => !!item) as { props: TabItemProps }[];

  return (
    <AntdTabs
      {...rest}
      items={tabs.map((item) => ({
        label: item.props.label,
        key: item.props.index,
        children: item.props.children,
        style: item.props.style,
      }))}
    />
  );
};
