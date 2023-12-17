import { Pagination } from 'antd';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import BallIcon from '@/assets/icons/Ball';
import ReserveIcon from '@/assets/icons/Reserve';
import SortIcon from '@/assets/icons/Sort';
import Image from '@/assets/stadium.jpeg';
import Select from '@/components/Select';
import { SquareTag } from '@/components/Tag';
import useFilter from '@/hooks/useFilter';
import Filter from '@/modules/main/components/Filter';
import { useBrowseVenue } from '@/modules/main/pages/Venue/services';
import { useSports } from '@/services/useFilters';
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
  grid-template-columns: repeat(auto-fill, minmax(min(40%, max(200px, 30%)), 1fr));
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

const ItemTag = styled(SquareTag).withConfig({
  shouldForwardProp: (prop) => !['reservable'].includes(prop),
})<{ reservable: boolean }>`
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
  const { stadium_id } = useParams();
  const limit = useMemo(() => 9, []);
  const [offset, setOffset] = useState(0);
  const { sport, setSport, isReservable, setIsReservable, name, setName } = useFilter();
  const [word, setWord] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const { venues, count } = useBrowseVenue({
    limit,
    offset,
    stadium_id: Number(stadium_id),
    is_reservable: isReservable,
    sport_id: sport,
    name,
  });
  const { data: sports } = useSports();

  return (
    <Filter
      searchable={true}
      word={word}
      setWord={setWord}
      onSearch={(name) => setName(name)}
      filters={
        <>
          <Select
            title="排序"
            items={[
              '價格由高至低排序',
              '價格由低至高排序',
              '使用人數由高至低排序',
              '使用人數由低至高排序',
            ].map((label, index) => ({ label, key: String(index + 1) }))}
            icon={<SortIcon />}
          />
          {' · '}
          <Select
            title="運動項目"
            selectedKeys={sport ? [String(sport)] : []}
            icon={<BallIcon />}
            items={sports?.data?.map((sport) => ({
              label: sport.name,
              key: String(sport.id),
            }))}
            onSelect={({ key }) => setSport(Number(key))}
          />
          <Select title="容納人數" items={[]}></Select>
          <Select
            title="開放預約"
            selectedKeys={isReservable !== undefined ? [isReservable ? '1' : '2'] : []}
            items={[
              { label: '需預約', key: '1' },
              { label: '不需預約', key: '2' },
            ]}
            onSelect={({ key }) => setIsReservable(!(Number(key) - 1))}
            icon={<ReserveIcon />}
          />
        </>
      }
    >
      <GalleryContent>
        {venues?.map((venue, index) => (
          <Item key={index} onClick={() => navigate(`${venue.id}`)}>
            <ItemTag reservable={venue.is_reservable}>
              {venue.is_reservable ? '可預約' : '不可預約'}
            </ItemTag>
            <ItemInfo>
              <ItemInfoTitle>{venue.name}</ItemInfoTitle>
              <ItemInfoContent>{`${venue.floor}F．可容納 ${venue.capacity} 人．${venue.current_user_count} 人正在使用中`}</ItemInfoContent>
            </ItemInfo>
          </Item>
        ))}
      </GalleryContent>
      {children}
      <Pagination
        style={{ alignSelf: 'flex-end' }}
        total={Math.ceil((count ?? 0) / limit)}
        pageSize={1}
        showSizeChanger={false}
        current={Math.floor(offset / limit) + 1}
        onChange={(number) => setOffset((number - 1) * limit)}
      />
    </Filter>
  );
}
