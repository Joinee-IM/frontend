import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

import type { Type } from '@/utils/type';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import FilterIcon from '@/assets/icons/Filter';
import SearchIcon from '@/assets/icons/Search';

interface FilterProps<T extends true | false> extends Type<typeof ToolBarWrapper> {
  filters: ReactNode;
  onClose?: () => void;
  searchable: T;
  onSearch: T extends true ? (word?: string) => void : null;
  word: T extends true ? string | undefined : null;
  setWord: T extends true ? Dispatch<SetStateAction<string | undefined>> : null;
}

const ToolBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 10px;
`;

const ToolBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilterWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['visible'].includes(prop),
})<{ visible: boolean }>`
  display: flex;
  column-gap: 8px;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  align-items: center;
  padding-right: 8px;
  margin-right: 8px;
  overflow: scroll;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 7px;
  flex-shrink: 0.5;
  svg {
    color: ${({ theme }) => theme.gray[700]};
  }
`;

const SearchWrapper = styled.div`
  * {
    padding-left: 7px;
  }
  align-items: center;
  display: flex;
`;

export default function Filter<T extends true | false>({
  children,
  filters,
  onClose,
  onSearch,
  searchable,
  word,
  setWord,
}: FilterProps<T>) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState<string | undefined>(undefined);

  return (
    <ToolBarWrapper>
      <ToolBar>
        <FilterWrapper visible={filterOpen}>{filters}</FilterWrapper>
        <IconWrapper>
          {!filterOpen ? (
            <FilterIcon fontSize="20px" cursor="pointer" onClick={() => setFilterOpen(true)} />
          ) : (
            <CloseOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setFilterOpen(false);
                onClose?.();
              }}
            />
          )}
          {searchable && (
            <SearchWrapper>
              <SearchIcon fontSize="24px" cursor="pointer" onClick={() => setSearch('')} />
              {search !== undefined && (
                <Input
                  value={word ?? undefined}
                  onChange={(e) => setWord?.(e.target.value)}
                  placeholder="搜尋"
                  bordered={false}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing && word) {
                      onSearch?.(word);
                    }
                  }}
                />
              )}
            </SearchWrapper>
          )}
        </IconWrapper>
      </ToolBar>
      {children}
    </ToolBarWrapper>
  );
}
