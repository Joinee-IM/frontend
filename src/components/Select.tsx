import { Dropdown, Select as SelectAntd, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import type { ButtonProps, MenuProps } from 'antd';
import type { SelectProps as AntdSelectProps } from 'antd/es/select';
import type { ReactNode } from 'react';

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
        // category={selected ? 'solid' : 'outlined'}
        category="outlined"
        palette="main"
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

export interface SearchSelectProps<ValueType>
  extends Omit<AntdSelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetcher: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

export const SearchSelect = <ValueType extends { label: ReactNode; value: string | number }>({
  fetcher,
  debounceTimeout = 300,
  ...props
}: SearchSelectProps<ValueType>) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      void fetcher(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) return;

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetcher, debounceTimeout]);

  return (
    <SelectAntd
      mode="multiple"
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
};
