import { Dropdown } from 'antd';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import type { ButtonProps, MenuProps } from 'antd';

import { DownArrowIcon, UpArrowIcon } from '@/assets/icons/Arrow';
import { RippleButton } from '@/components/Button';

interface SelectProps extends MenuProps {
  title?: string;
  items: { label: string; key: string }[] | undefined;
  loading?: ButtonProps['loading'];
  icon?: ButtonProps['icon'];
}

const TitleWrapper = styled.div`
  display: flex;
  column-gap: 6px;
  align-items: center;
`;

export default function Select({
  title,
  items,
  loading,
  icon,
  onSelect,
  selectedKeys,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(
    () =>
      selectedKeys?.length ? items?.find((item) => item.key === selectedKeys[0])?.label : undefined,
    [items, selectedKeys],
  );

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys,
        onClick: () => setOpen(false),
        onSelect,
      }}
      onOpenChange={(status) => setOpen(status)}
      trigger={['click']}
      disabled={!items?.length}
    >
      <RippleButton
        icon={icon}
        loading={loading}
        category={selected ? 'solid' : 'outlined'}
        palette="sub"
        onClick={(e) => e.preventDefault()}
      >
        <TitleWrapper>
          {selected ?? title}
          {open ? (
            <UpArrowIcon style={{ fontSize: '0.5em' }} />
          ) : (
            <DownArrowIcon style={{ fontSize: '0.5em' }} />
          )}
        </TitleWrapper>
      </RippleButton>
    </Dropdown>
  );
}
