import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

import type { Type } from '@/utils/type';
import type { ReactNode } from 'react';

import FilterIcon from '@/assets/icons/Filter';
import SearchIcon from '@/assets/icons/Search';

interface GalleryProps extends Type<typeof ToolBarWrapper> {
  filters: ReactNode;
  twoSteps?: boolean;
  searchable?: boolean;
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

export default function Filter({
  children,
  filters,
  searchable = true,
  twoSteps = true,
}: GalleryProps) {
  const [filterOpen, setFilterOpen] = useState(!twoSteps);
  const [search, setSearch] = useState<string | undefined>(undefined);
  return (
    <ToolBarWrapper>
      <ToolBar>
        <FilterWrapper visible={filterOpen}>{filters}</FilterWrapper>
        <IconWrapper>
          {!twoSteps ? null : !filterOpen ? (
            <FilterIcon fontSize="20px" cursor="pointer" onClick={() => setFilterOpen(true)} />
          ) : (
            <CloseOutlined style={{ cursor: 'pointer' }} onClick={() => setFilterOpen(false)} />
          )}
          {searchable && (
            <SearchWrapper>
              <SearchIcon fontSize="24px" cursor="pointer" onClick={() => setSearch('')} />
              {search !== undefined && <Input placeholder="搜尋" bordered={false} />}
            </SearchWrapper>
          )}
        </IconWrapper>
      </ToolBar>
      {children}
    </ToolBarWrapper>
  );
}
