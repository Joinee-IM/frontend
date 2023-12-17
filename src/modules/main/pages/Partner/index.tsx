import { debounce } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';

import BuildingIcon from '@/assets/icons/Building';
import { DirectionLeftIcon, DirectionRightIcon } from '@/assets/icons/Direction';
import PositionIcon from '@/assets/icons/Position';
import SortIcon from '@/assets/icons/Sort';
import AllSportIcon from '@/assets/icons/sport';
import { RippleButton } from '@/components/Button';
import Select from '@/components/Select';
import { TabPane, Tabs } from '@/components/Tab';
import useFilter from '@/hooks/useFilter';
import { Container, PageTitle } from '@/modules/main/components';
import Filter from '@/modules/main/components/Filter';
import FlipCard from '@/modules/main/pages/Partner/components/FlipCard';
import { useBrowseReservation } from '@/modules/main/pages/Partner/services';
import { useBrowseStadium } from '@/modules/main/pages/Stadium/services';
import { useCity, useDistrict, useSports } from '@/services/useFilters';
import { percentageOfFigma, rwdFontSize } from '@/utils/css';
import toSportIcon from '@/utils/function/map/toSportIcon';

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  column-gap: ${percentageOfFigma(20).max};
  .ant-tabs-content-holder {
    border: 0;
  }
  .ant-tabs-ink-bar {
    left: 0;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  ${rwdFontSize(20)};
  column-gap: 0.7em;
`;

const FlipCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(40%, max(230px, 30%)), 1fr));
  grid-template-rows: auto auto;
  gap: ${percentageOfFigma(37).max};
`;

export default function Partner() {
  const { city, setCity, district, setDistrict, sport, setSport } = useFilter();
  const [stadiumId, setStadiumId] = useState<number | undefined>();
  const limit = 6;
  const [offset, setOffset] = useState(0);

  const { data: sports } = useSports();
  const { data: cities, isLoading: loadingCity } = useCity();
  const { data: districts, isLoading: loadingDistrict } = useDistrict(city ?? 0);
  const { reservations, hasNextPage, hasPreviousPage } = useBrowseReservation({
    limit,
    offset,
    sport_id: sport,
    stadium_id: stadiumId,
  });

  const { stadiums } = useBrowseStadium({
    limit: 30,
    offset: 0,
  });

  return (
    <Container
      style={{
        padding: `${percentageOfFigma(85).vh} clamp(30px, ${percentageOfFigma(66).max}, 200px)`,
      }}
    >
      <PageTitle>尋找球友</PageTitle>
      <ContentWrapper>
        <Tabs
          tabPosition={'left'}
          onChange={(key) => setSport(Number(key) ? Number(key) : undefined)}
        >
          <TabPane
            index="0"
            label={
              <LabelWrapper>
                <AllSportIcon fontSize="1.3em" /> 全部
              </LabelWrapper>
            }
            key="0"
          >
            <></>
          </TabPane>
          {sports?.data?.map((sport) => {
            const Icon = toSportIcon(sport.name);
            return (
              <TabPane
                index={String(sport.id)}
                label={
                  <LabelWrapper>
                    {Icon && <Icon />}
                    {sport.name}
                  </LabelWrapper>
                }
                key={String(sport.id)}
              >
                <></>
              </TabPane>
            );
          })}
        </Tabs>
        <RippleButton
          category="icon"
          palette="gray"
          style={{
            alignSelf: 'center',
            fontSize: '2em',
            visibility: !hasPreviousPage ? 'hidden' : 'visible',
          }}
          onClick={() => setOffset((prev) => Math.max(0, prev - limit))}
        >
          <DirectionLeftIcon />
        </RippleButton>
        <Filter
          style={{ flex: 1, rowGap: '30px', justifyContent: 'flex-start' }}
          searchable={false}
          twoStepsFilter={false}
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
                loading={loadingCity}
                title="縣市"
                selectedKeys={city ? [String(city)] : []}
                icon={<PositionIcon />}
                items={cities?.data?.map((city) => ({ label: city.name, key: String(city.id) }))}
                onSelect={({ key }) => setCity(Number(key))}
              />
              <Select
                title="行政區"
                selectedKeys={district ? [String(district)] : []}
                icon={<BuildingIcon />}
                loading={loadingDistrict}
                items={districts?.data?.map((district) => ({
                  label: district.name,
                  key: String(district.id),
                }))}
                onSelect={({ key }) => setDistrict(Number(key))}
              />
              <Select
                title="場館"
                selectedKeys={stadiumId ? [String(stadiumId)] : []}
                icon={<BuildingIcon />}
                items={stadiums?.map((stadium) => ({
                  label: stadium.name,
                  key: String(stadium.id),
                }))}
                onSelect={({ key }) => setStadiumId(Number(key))}
              />
            </>
          }
        >
          <FlipCardsWrapper>
            {reservations?.map((reservation, index) => <FlipCard key={index} {...reservation} />)}
          </FlipCardsWrapper>
        </Filter>

        <RippleButton
          category="icon"
          palette="gray"
          style={{
            alignSelf: 'center',
            fontSize: '2em',
            visibility: !hasNextPage ? 'hidden' : 'visible',
          }}
          onClick={debounce(() => setOffset((prev) => prev + limit), 300)}
        >
          <DirectionRightIcon />
        </RippleButton>
      </ContentWrapper>
    </Container>
  );
}
