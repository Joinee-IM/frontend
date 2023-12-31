import { Radio } from 'antd';
import { useCallback, useMemo, useState } from 'react';

import type { DataType } from '@/modules/lessor/pages/Manage/types';
import type { TablePaginationConfig } from 'antd';
import type { Dispatch, Key, SetStateAction } from 'react';

import InfoIcon from '@/assets/icons/Info';
import { RippleButton } from '@/components';
import { useLoading } from '@/components/Loading/PageLoading';
import PopOver from '@/components/Popover';
import CourtTable from '@/modules/lessor/pages/Manage/Court';
import StadiumTable from '@/modules/lessor/pages/Manage/Stadium';
import VenueTable from '@/modules/lessor/pages/Manage/Venue';
import {
  useBatchEditCourts,
  useBatchEditStadiums,
  useBatchEditVenues,
  useLessorBrowseCourt,
  useLessorBrowseStadium,
  useLessorBrowseVenue,
} from '@/modules/lessor/services';
import { Container, PageTitle } from '@/modules/main/components';
import Filter from '@/modules/main/components/Filter';
import theme from '@/provider/theme/theme';

type UnitType = '場館' | '場地' | '小單位';

export default function Manage() {
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
  const [unitType, setUnitType] = useState<UnitType>('場館');

  const units: UnitType[] = ['場館', '場地', '小單位'];
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { mutateAsync: mutateVenue, isLoading: EditingVenues } = useBatchEditVenues();
  const { mutateAsync: mutateStadium, isLoading: EditingStadiums } = useBatchEditStadiums();
  const { mutateAsync: mutateCourt, isLoading: EditingCourts } = useBatchEditCourts();

  const handleBatchEdit = useCallback(
    (unitType: UnitType) => (is_published: boolean, ids: number[]) => async () => {
      switch (unitType) {
        case '場館':
          await mutateStadium({ is_published, stadium_ids: ids });
          await refetchStadiums();
          break;
        case '場地':
          await mutateVenue({ is_published, venue_ids: ids });
          await refetchVenues();
          break;
        case '小單位':
          await mutateCourt({ is_published, court_ids: ids });
          await refetchCourts();
          break;
        default:
          break;
      }
      setSelectedRowKeys([]);
    },
    [mutateCourt, mutateStadium, mutateVenue, refetchCourts, refetchStadiums, refetchVenues],
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
              loading={EditingStadiums || EditingVenues || EditingCourts}
            >
              上架
            </RippleButton>
          )}
          {selectedRowKeys.some((key) => data.find((row) => row.key === key)?.is_published) && (
            <PopOver
              placement="topRight"
              icon={<InfoIcon fontSize="1.3em" color={theme.red[700]} />}
              content={
                unitType === '場館' ? (
                  <div style={{ width: '300px' }}>
                    下架此場館後，其包含之所有場地將一併下架，您確定要下架此場館嗎？
                  </div>
                ) : unitType === '場地' ? (
                  <div style={{ width: '300px' }}>
                    下架此場地後，其包含之所有小單位將一併下架，您確定要下架此場地嗎？
                  </div>
                ) : (
                  <div style={{ width: '300px' }}>您確定要下架此小單位嗎？</div>
                )
              }
              footer={
                <RippleButton
                  category="solid"
                  palette="red"
                  onClick={handleBatchEdit(unitType)(false, selectedRowKeys.map(Number))}
                  loading={EditingStadiums || EditingVenues || EditingCourts}
                >
                  確認
                </RippleButton>
              }
              trigger="click"
            >
              <RippleButton category="outlined" palette="red">
                下架
              </RippleButton>
            </PopOver>
          )}
        </>
      ) : undefined,
    [
      EditingCourts,
      EditingStadiums,
      EditingVenues,
      data,
      handleBatchEdit,
      selectedRowKeys,
      unitType,
    ],
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
          searchable={false}
          twoStepsFilter={false}
          customControl={control}
          filters={
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
                <Radio.Button
                  value={unit}
                  key={index}
                  style={{ borderColor: theme.sub[500], fontSize: '13px' }}
                >
                  {unit}
                </Radio.Button>
              ))}
            </Radio.Group>
          }
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
