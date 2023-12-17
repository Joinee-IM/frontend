import { Pagination } from 'antd';
import { Fragment, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import BallIcon from '@/assets/icons/Ball';
import ReserveIcon from '@/assets/icons/Reserve';
import SortIcon from '@/assets/icons/Sort';
import Select from '@/components/Select';
import useFilter from '@/hooks/useFilter';
import { Container, PageTitle } from '@/modules/main/components';
import Filter from '@/modules/main/components/Filter';
import { useStadiumInfo } from '@/modules/main/pages/Stadium/services';
import GalleryItem from '@/modules/main/pages/Venue/components/ListItem';
import { useBrowseVenue } from '@/modules/main/pages/Venue/services';
import { useSports } from '@/services/useFilters';

const GalleryContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(40%, max(200px, 30%)), 1fr));
  gap: 8px;
`;

export default function VenueList() {
  const { stadium_id } = useParams();
  const { data: info } = useStadiumInfo(Number(stadium_id));
  const limit = useMemo(() => 9, []);
  const [offset, setOffset] = useState(0);
  const { sport, setSport, isReservable, setIsReservable, name, setName } = useFilter();
  const [word, setWord] = useState<string | undefined>(undefined);

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
    <Container style={{ height: 'auto' }}>
      <PageTitle>{info?.data?.name} / 尋找場地</PageTitle>
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
            <Fragment key={index}>
              <GalleryItem
                venue_id={venue.id}
                is_reservable={venue.is_reservable}
                name={venue.name}
                floor={venue.floor}
                capacity={venue.capacity}
                current_user_count={venue.current_user_count}
              />
            </Fragment>
          ))}
        </GalleryContent>
        <Pagination
          style={{ alignSelf: 'flex-end' }}
          total={Math.ceil((count ?? 0) / limit)}
          pageSize={1}
          showSizeChanger={false}
          current={Math.floor(offset / limit) + 1}
          onChange={(number) => setOffset((number - 1) * limit)}
        />
      </Filter>
    </Container>
  );
}
