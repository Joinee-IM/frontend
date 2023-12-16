import { Tabs as AntdTabs } from 'antd';
import { Fragment, type ReactNode } from 'react';

import type { TabsProps as AntdTabProps } from 'antd';

type TabItemProps = Exclude<AntdTabProps['items'], undefined>[number] & {
  index: string;
  children: ReactNode;
};

export const TabPane = (props: TabItemProps) => {
  return <Fragment {...props}></Fragment>;
};

export const Tabs = ({ children, ...rest }: AntdTabProps) => {
  const tabs = [children]
    .flat()
    .flat()
    .filter((item) => !!item) as { props: TabItemProps }[];

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
