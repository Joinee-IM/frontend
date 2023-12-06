import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useState } from 'react';

import type { ButtonProps, MenuProps } from 'antd';

import PositionIcon from '@/assets/icons/Position';
import { RippleButton } from '@/components/Button';

interface SelectProps extends MenuProps {
  title?: string;
  items: { label: string; key: string }[];
  icon?: ButtonProps['icon'];
}

export default function Select({ title, items, icon = <PositionIcon /> }: SelectProps) {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        onClick: () => setOpen(false),
        onSelect: ({ key }) => setSelected(items?.find((item) => item.key === key)?.label),
      }}
      onOpenChange={(status) => setOpen(status)}
      trigger={['click']}
    >
      <RippleButton
        icon={icon}
        category={selected ? 'solid' : 'outlined'}
        palette="sub"
        onClick={(e) => e.preventDefault()}
      >
        {selected ?? title}
        {open ? <UpOutlined /> : <DownOutlined />}
      </RippleButton>
    </Dropdown>
  );
}
