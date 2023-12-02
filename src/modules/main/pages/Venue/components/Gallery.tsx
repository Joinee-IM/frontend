import { Pagination } from 'antd';
import { motion } from 'framer-motion';
import { range } from 'lodash';
import styled from 'styled-components';

import Image from '@/assets/stadium.jpeg';
import Select from '@/components/Select';
import { SquareTag } from '@/components/Tag';
import Filter from '@/modules/main/components/Filter';
import { backgroundCenter } from '@/utils/css';
type GalleryProps = React.ComponentProps<typeof GalleryWrapper>;

const GalleryWrapper = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 10px;
`;

const GalleryContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(40%, max(200px, 30%)), 1fr));
  gap: 8px;
`;

const Item = styled.div`
  aspect-ratio: 1.1;
  background-color: aliceblue;
  background-image: url(${Image});
  ${backgroundCenter}
  position: relative;
  overflow: hidden;
  cursor: pointer;
  .gallery_item_info {
    /* transform: translate(0, 22px); */
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    & .gallery_item_info {
      /* transform: translate(0, 0px); */
      background-color: ${({ theme }) => theme.main[300]};
    }
  }
`;

const ItemTag = styled(SquareTag)<{ reservable: boolean }>`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${({ theme, reservable }) => (reservable ? theme.sub[300] : theme.red[300])};
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
  return (
    <Filter
      filters={
        <>
          <Select title={'排序'} items={[]}></Select>
          {' · '}
          <Select title={'運動項目'} items={[]}></Select>
          <Select title={'容納人數'} items={[]}></Select>
          <Select title={'開放預約'} items={[]}></Select>
        </>
      }
      searchable={false}
    >
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
      <Pagination
        style={{ alignSelf: 'flex-end' }}
        total={85}
        pageSize={1}
        showSizeChanger={false}
      />
    </Filter>
  );
}
