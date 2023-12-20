import { Input } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
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
  twoStepsFilter?: boolean;
  customControl?: ReactNode;
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
  overflow: hidden;
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
  & > * {
    flex-shrink: 0;
  }
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? 0 : '100%')});
  transition: all 0.1s linear;
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
  overflow: hidden;
`;

export default function Filter({
  children,
  filters,
  onClose,
  onSearch,
  searchable,
  word,
  setWord,
  twoStepsFilter = true,
  customControl,
  ...rest
}: UnSearchableFilterProps | SearchableFilterProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <ToolBarWrapper {...rest}>
      <ToolBar>
        <FilterWrapper visible={twoStepsFilter ? filterOpen : true}>{filters}</FilterWrapper>
        <IconWrapper>
          {customControl ?? (
            <>
              {twoStepsFilter &&
                (!filterOpen ? (
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
                    <CloseIcon fontSize="1em" />
                  </RippleButton>
                ))}
              {searchable && (
                <SearchWrapper>
                  <RippleButton
                    category="icon"
                    palette="gray"
                    onClick={() => setWord((prev) => (prev === undefined ? '' : undefined))}
                  >
                    <SearchIcon fontSize="1.5em" />
                  </RippleButton>
                  <AnimatePresence>
                    {word !== undefined && (
                      <motion.div
                        initial={{ opacity: 1, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                        }}
                        style={{ borderBottom: '1px solid black' }}
                      >
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SearchWrapper>
              )}
            </>
          )}
        </IconWrapper>
      </ToolBar>
      {children}
    </ToolBarWrapper>
  );
}
