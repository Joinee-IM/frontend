import { motion } from 'framer-motion';
import { range } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';

import { LeftArrowIcon, RightArrowIcon } from '@/assets/icons/Arrow';
import FilterIcon from '@/assets/icons/Filter';
import SearchIcon from '@/assets/icons/Search';
import Image from '@/assets/stadium.jpeg';
import { RippleButton } from '@/components/Button';
import theme from '@/provider/theme/theme';
type GalleryProps = React.ComponentProps<typeof GalleryWrapper>;

const GalleryWrapper = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 10px;
`;

const ToolBar = styled.div`
  width: 100%;
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 7px;
  svg {
    color: ${({ theme }) => theme.main[500]};
  }
`;

// const FilterOptionsWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;

const PageWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 7px;
  margin-top: 10px;
`;

const GalleryContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  overflow: scroll;
  gap: 8px;
`;

const Item = styled.div`
  aspect-ratio: 1.1;
  background-color: aliceblue;
  background-image: url(${Image});
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  .gallery_item_info {
    transform: translate(0, 22px);
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    & .gallery_item_info {
      transform: translate(0, 0px);
      background-color: ${({ theme }) => theme.main[300]};
    }
  }
`;

const ItemTag = styled.div<{ reservable: boolean }>`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px 8px;
  background-color: ${({ theme, reservable }) => (reservable ? theme.sub[300] : theme.red[300])};
  color: ${({ theme }) => theme.white};
  border-radius: 8px;
`;

const ItemInfo = styled(motion.div).attrs({ className: 'gallery_item_info' })`
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 18px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.main[500]};
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const ItemInfoTitle = styled.div`
  font-weight: 600;
`;
const ItemInfoContent = styled.div`
  font-size: 9px;
`;

export default function Gallery({ children }: GalleryProps) {
  const [page, setPage] = useState(1);
  return (
    <GalleryWrapper>
      <ToolBar>
        <FilterIcon fontSize="20px" />
        <SearchIcon fontSize="24px" />
      </ToolBar>
      <GalleryContent>
        {range(9).map((m) => (
          <Item key={m}>
            <ItemTag reservable={m !== 5}>{m === 5 ? '不可預約' : '可預約'}</ItemTag>
            <ItemInfo>
              <ItemInfoTitle>綜合球場</ItemInfoTitle>
              <ItemInfoContent>3F．可容納 200 人．104 人正在使用中</ItemInfoContent>
            </ItemInfo>
          </Item>
        ))}
      </GalleryContent>
      {children}
      <PageWrapper>
        <RippleButton type="link" category="link" palette="gray">
          <LeftArrowIcon fontSize={12} />
        </RippleButton>

        {range(1, 6).map((m) => (
          <RippleButton
            onClick={() => setPage(m)}
            type="link"
            category="link"
            palette="table"
            key={m}
            style={{
              border: page === m ? `2px solid ${theme.main[500]}` : '2px solid transparent',
            }}
          >
            {m}
          </RippleButton>
        ))}
        <RippleButton type="link" category="link" palette="gray">
          <RightArrowIcon fontSize={12} />
        </RippleButton>
      </PageWrapper>
    </GalleryWrapper>
  );
}
