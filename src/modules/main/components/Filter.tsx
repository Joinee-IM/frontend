import { Input } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

import type { Type } from '@/utils/type';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import CloseIcon from '@/assets/icons/Close';
import FilterIcon from '@/assets/icons/Filter';
import SearchIcon from '@/assets/icons/Search';
import { RippleButton } from '@/components/Button';

interface FilterProps extends Type<typeof ToolBarWrapper> {
  filters: ReactNode;
  onClose?: () => void;
}

interface UnSearchableFilterProps extends FilterProps {
  onSearch?: null;
  word?: null;
  setWord?: null;
  searchable?: false;
}

interface SearchableFilterProps extends FilterProps {
  onSearch: (word?: string) => void;
  word: string | undefined;
  setWord: Dispatch<SetStateAction<string | undefined>>;
  searchable: true;
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
  align-items: center;
  display: flex;
`;

export default function Filter({
  children,
  filters,
  onClose,
  onSearch,
  searchable,
  word,
  setWord,
}: UnSearchableFilterProps | SearchableFilterProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <ToolBarWrapper>
      <ToolBar>
        <FilterWrapper visible={filterOpen}>{filters}</FilterWrapper>
        <IconWrapper>
          {!filterOpen ? (
            <RippleButton category="icon" palette="gray" onClick={() => setFilterOpen(true)}>
              <FilterIcon fontSize="1.5em" />
            </RippleButton>
          ) : (
            <RippleButton
              category="icon"
              palette="gray"
              onClick={() => {
                setFilterOpen(false);
                onClose?.();
              }}
            >
              <CloseIcon fontSize="1.5em" />
            </RippleButton>
          )}
          {searchable && (
            <SearchWrapper>
              <RippleButton
                category="icon"
                palette="gray"
                onClick={() => setWord((prev) => (prev === undefined ? '' : undefined))}
              >
                <SearchIcon fontSize="1.5em" />
              </RippleButton>
              {word !== undefined && (
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
