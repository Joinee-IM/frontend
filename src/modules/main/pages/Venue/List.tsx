import { Pagination } from 'antd';
import { Fragment, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import BallIcon from '@/assets/icons/Ball';
import ReserveIcon from '@/assets/icons/Reserve';
import SortIcon from '@/assets/icons/Sort';
import { useLoading } from '@/components/Loading/PageLoading';
import Select from '@/components/Select';
import useFilter from '@/hooks/useFilter';
import useSorter, { options } from '@/hooks/useSorter';
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
  const limit = useMemo(() => 9, []);
  const [offset, setOffset] = useState(0);
  const [word, setWord] = useState<string | undefined>(undefined);
  const { sort, setSort, order, setOrder, splitSorter } = useSorter();
  const { sport, setSport, isReservable, setIsReservable, name, setName } = useFilter();

  const { data: info, isLoading } = useStadiumInfo(Number(stadium_id));
  const { context } = useLoading([isLoading]);
  const { venues, count } = useBrowseVenue({
    limit,
    offset,
    stadium_id: Number(stadium_id),
    is_reservable: isReservable,
    sport_id: sport,
    name,
    sort_by: sort,
    order,
  });
  const { data: sports } = useSports();

  return (
    <>
      {context}
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
                selectedKeys={sort && order ? [`${sort}+${order}`] : []}
                items={options}
                icon={<SortIcon />}
                onSelect={({ key }) => {
                  const [s, o] = splitSorter(key);
                  setSort(s as 'CURRENT_USER_COUNT' | undefined);
                  setOrder(o);
                }}
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
    </>
  );
}
