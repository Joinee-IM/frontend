import { Radio } from 'antd';
import { useCallback, useMemo, useState } from 'react';

import type { DataType } from '@/modules/lessor/pages/Manage/types';
import type { TablePaginationConfig } from 'antd';
import type { Dispatch, Key, SetStateAction } from 'react';

import BuildingIcon from '@/assets/icons/Building';
import PositionIcon from '@/assets/icons/Position';
import { RippleButton } from '@/components';
import { useLoading } from '@/components/Loading/PageLoading';
import Select from '@/components/Select';
import useFilter from '@/hooks/useFilter';
import CourtTable from '@/modules/lessor/pages/Manage/Court';
import StadiumTable from '@/modules/lessor/pages/Manage/Stadium';
import VenueTable from '@/modules/lessor/pages/Manage/Venue';
import {
  useBatchEditVenues,
  useLessorBrowseCourt,
  useLessorBrowseStadium,
  useLessorBrowseVenue,
} from '@/modules/lessor/services';
import { Container, PageTitle } from '@/modules/main/components';
import Filter from '@/modules/main/components/Filter';
import theme from '@/provider/theme/theme';
import { useCity, useDistrict } from '@/services/useFilters';

type UnitType = '場館' | '場地' | '小單位';

export default function Manage() {
  const { city, setCity, district, setDistrict, setName } = useFilter();
  const [word, setWord] = useState<string | undefined>(undefined);
  const [data, setData] = useState<DataType[]>([]);

  const { refetch: refetchVenues, isLoading: venuesLoading } = useLessorBrowseVenue({
    limit: 10,
    offset: 0,
  });
  const { refetch: refetchStadiums, isLoading: stadiumsLoading } = useLessorBrowseStadium({
    limit: 10,
    offset: 0,
  });
  const { refetch: refetchCourts, isLoading: courtsLoading } = useLessorBrowseCourt({
    limit: 10,
    offset: 0,
  });
  const { data: cities, isLoading: loadingCity } = useCity();
  const { data: districts, isLoading: loadingDistrict } = useDistrict(city);
  const [unitType, setUnitType] = useState<UnitType>('場館');

  const units: UnitType[] = ['場館', '場地', '小單位'];
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { mutateAsync, isLoading } = useBatchEditVenues();

  const handleBatchEdit = useCallback(
    (unitType: UnitType) => (is_published: boolean, ids: number[]) => async () => {
      switch (unitType) {
        case '場館':
          void refetchStadiums();
          break;
        case '場地':
          await mutateAsync({ is_published, venue_ids: ids });
          await refetchVenues();
          break;
        case '小單位':
          void refetchCourts();
          break;
        default:
          break;
      }
      setSelectedRowKeys([]);
    },
    [mutateAsync, refetchCourts, refetchStadiums, refetchVenues],
  );

  const control = useMemo(
    () =>
      selectedRowKeys.length ? (
        <>
          {selectedRowKeys.some((key) => !data.find((row) => row.key === key)?.is_published) && (
            <RippleButton
              category="outlined"
              palette="main"
              onClick={handleBatchEdit(unitType)(true, selectedRowKeys.map(Number))}
              loading={isLoading}
            >
              上架
            </RippleButton>
          )}
          {selectedRowKeys.some((key) => data.find((row) => row.key === key)?.is_published) && (
            <RippleButton
              category="outlined"
              palette="red"
              onClick={handleBatchEdit(unitType)(false, selectedRowKeys.map(Number))}
              loading={isLoading}
            >
              下架
            </RippleButton>
          )}
        </>
      ) : undefined,
    [data, handleBatchEdit, isLoading, selectedRowKeys, unitType],
  );

  const table = (unitType: UnitType) => {
    switch (unitType) {
      case '場館':
        return (
          <StadiumTable
            setData={setData}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        );
      case '場地':
        return (
          <VenueTable
            setData={setData}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        );
      case '小單位':
        return (
          <CourtTable
            setData={setData}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        );
      default:
        return null;
    }
  };

  const { context } = useLoading([venuesLoading, stadiumsLoading, courtsLoading]);

  return (
    <>
      {context}
      <Container>
        <PageTitle>管理現有設施 / {unitType}</PageTitle>
        <Filter
          searchable={true}
          word={word}
          setWord={setWord}
          twoStepsFilter={false}
          customControl={control}
          filters={
            <>
              <Radio.Group
                defaultValue={'場館'}
                buttonStyle="solid"
                value={unitType}
                onChange={({ target }) => {
                  setUnitType(target.value as UnitType);
                  setSelectedRowKeys([]);
                }}
              >
                {units.map((unit, index) => (
                  <Radio.Button value={unit} key={index} style={{ borderColor: theme.sub[500] }}>
                    {unit}
                  </Radio.Button>
                ))}
              </Radio.Group>
              {'  ・  '}
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
            </>
          }
          onSearch={(name) => setName(name)}
        >
          {table(unitType)}
        </Filter>
      </Container>
    </>
  );
}

export const pagination = (
  count: number,
  limit: number,
  offset: number,
  setOffset: Dispatch<SetStateAction<number>>,
): TablePaginationConfig => ({
  total: Math.ceil(count ?? 0),
  pageSize: limit,
  showSizeChanger: false,
  current: Math.floor(offset / limit) + 1,
  onChange: (number) => setOffset((number - 1) * limit),
});
