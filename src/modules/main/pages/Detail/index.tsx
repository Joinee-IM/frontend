import { Radio } from 'antd';
import { addDays, eachDayOfInterval, endOfWeek, format, getDay, startOfWeek } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { LeftArrowIcon, RightArrowIcon } from '@/assets/icons/Arrow';
import FireIcon from '@/assets/icons/Fire';
import { RippleButton } from '@/components/Button';
import GridForm from '@/components/Grid/FormGrid';
import { useLoading } from '@/components/Loading/PageLoading';
import { TabPane, Tabs } from '@/components/Tab';
import { RoundTag, RoundTagWrapper, SquareTag } from '@/components/Tag';
import TimeSlot, { reservationToTimeRange } from '@/components/TimeSlot';
import useTimeSlotDrag from '@/components/TimeSlot/useTimeSlotDrag';
import useDeviceDetector from '@/hooks/useDeviceDetector';
import { AlbumWrapper, ImagePreview } from '@/modules/main/pages/Stadium/components/DetailModal';
import { useStadiumInfo } from '@/modules/main/pages/Stadium/services';
import {
  useCourtReservations,
  useVenueCourts,
  useVenueInfo,
} from '@/modules/main/pages/Venue/services';
import { useAlbum, useBusinessHour } from '@/services/useInfo';
import { hexToRgb } from '@/utils';
import { backgroundCenter, percentageOfFigma } from '@/utils/css';
import { toFeeType } from '@/utils/function/map';
import { BusinessHours, hourIn } from '@/utils/function/time';

const Background = styled.div.withConfig({
  shouldForwardProp: (prop) => !['image'].includes(prop),
})<{ image?: string }>`
  width: 100%;
  height: clamp(200px, 25%, 280px);
  padding: 0 10%;
  box-sizing: border-box;
  background-image: ${({ image }) => `url(${image})`};
  ${backgroundCenter}
  position: relative;
  &::before {
    content: '';
    background-color: ${hexToRgb('#d9d9d9', 0.5)};
    position: absolute;
    ${backgroundCenter}
    position: absolute;
    inset: 0;
  }
`;

const TitleWrapper = styled.div`
  width: 80%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px 0;
  flex-wrap: wrap;
  row-gap: 10px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 30px;
  font-weight: 600;
  flex: 1;
  flex-basis: 80%;
`;

const ItemTag = styled(SquareTag).withConfig({
  shouldForwardProp: (prop) => !['reservable'].includes(prop),
})<{ reservable?: boolean }>`
  background-color: ${({ theme, reservable }) => (reservable ? theme.sub[300] : theme.red[300])};
`;

const ContentWrapper = styled.div`
  padding: 60px 10%;
  box-sizing: border-box;
  width: 100%;
  .ant-tabs-content-holder {
    border: 0;
  }
  .ant-tabs-ink-bar {
    left: 0;
  }
`;

const FilterWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  align-items: center;
  column-gap: ${percentageOfFigma(16).vw};
`;

const ReservationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const TimeSlotWrapper = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: repeat(2, auto);
  gap: 24px;
  align-items: center;
  width: 100%;
  padding-bottom: ${percentageOfFigma(40).max};
`;

export default function Venue() {
  const { isMobile } = useDeviceDetector(800);
  const { venue_id } = useParams();
  const { data: venue, isLoading: fetchingVenue } = useVenueInfo(Number(venue_id));
  const { data: stadium, isLoading: fetchingStadium } = useStadiumInfo(
    Number(venue?.data?.stadium_id),
  );
  const { data: album, isLoading: fetchingAlbum } = useAlbum(Number(venue_id), 'VENUE');
  const { data: businessHour, isLoading: fetchingBusiness } = useBusinessHour(
    Number(venue_id),
    'VENUE',
  );
  const { data: courts, mutate: getCourts } = useVenueCourts(Number(venue_id));
  const [page, setPage] = useState<number>(0);
  const [courtId, setCourtId] = useState(0);
  const {
    data,
    mutate: getReservations,
    isLoading: loadingCourtReservations,
  } = useCourtReservations(courtId);

  const [timeRange, availableTime] = useMemo(() => {
    const hours = new BusinessHours(businessHour?.data ?? []);
    return [hours.largestAvailableTimeRange, hours.timeMap];
  }, [businessHour?.data]);
  const dates = useMemo(() => {
    const baseDate = new Date();
    return eachDayOfInterval({
      start: addDays(startOfWeek(baseDate), page * 7),
      end: addDays(endOfWeek(baseDate), page * 7),
    });
  }, [page]);

  const init = useMemo<(boolean | null)[][]>(() => {
    const reserved = reservationToTimeRange(data?.data?.reservations);
    return dates.map(
      (date) =>
        timeRange?.slice(1).map((time) =>
          reserved[format(date, 'yyyy/MM/dd')]?.includes(time - 1) || // 已經被預約過的不能預約
          !availableTime[getDay(date) === 0 ? 7 : getDay(date)]?.some((end) => hourIn(end, time)) // 非營業時間不能預約
            ? null
            : false,
        ) ?? [],
    );
  }, [availableTime, data?.data?.reservations, dates, timeRange]);
  const { cells, handleUnitMouseDown, handleUnitMouseEnter } = useTimeSlotDrag(
    init,
    'straight',
    {},
    false,
  );
  const { context } = useLoading([fetchingAlbum, fetchingBusiness, fetchingStadium, fetchingVenue]);

  useEffect(() => {
    getCourts({});
  }, [getCourts]);

  useEffect(() => {
    if (courtId) {
      getReservations({ start_date: format(dates[0], 'yyyy-MM-dd') });
    }
  }, [courtId, dates, getReservations]);

  useEffect(() => {
    if (courts?.data?.length) setCourtId(courts?.data?.[0].id);
  }, [courts?.data]);

  return (
    <>
      {context}
      <Background image={album?.data?.[0]?.url ?? ''}>
        <TitleWrapper>
          <Title>{`${stadium?.data?.name} / ${venue?.data?.name}`}</Title>
          <ItemTag reservable={venue?.data?.is_reservable}>
            <FireIcon fontSize="0.4em" /> {venue?.data?.current_user_count} 人使用中
          </ItemTag>
        </TitleWrapper>
      </Background>
      <ContentWrapper>
        <Tabs tabPosition={isMobile ? 'top' : 'left'}>
          <TabPane index="1" label="關於場地" key="1">
            <GridForm
              style={{ width: isMobile ? '100%' : 'max(36.5%, 575px)', gap: '20px' }}
              data={{
                樓層: `${venue?.data?.floor}F`,
                場地面積: `${venue?.data?.area} 平方公尺`,
                可容納人數: `${venue?.data?.capacity} 人`,
                提供的運動項目: (
                  <RoundTagWrapper>
                    <RoundTag>{venue?.data?.sport_name}</RoundTag>
                  </RoundTagWrapper>
                ),
                小單位: `${venue?.data?.court_count} ${venue?.data?.court_type}`,
                收費資訊: venue?.data?.fee_rate
                  ? `${venue?.data?.fee_rate} 元${toFeeType(venue?.data?.fee_type)}`
                  : '免費',
                ...(venue?.data?.is_reservable && {
                  預約開放時間: `租借日的 ${venue?.data?.reservation_interval} 天前`,
                }),
                ...(venue?.data?.is_reservable && {
                  預約開放時間: `租借日的 ${venue?.data?.reservation_interval} 天前`,
                }),
                設備: venue?.data?.facilities ? venue?.data?.facilities : '無',
                運動器材租借: venue?.data?.sport_equipments ? venue?.data?.sport_equipments : '無',
              }}
              labelStyles={{ 設備: { alignSelf: 'baseline' } }}
            />
          </TabPane>
          {venue?.data?.is_reservable ? (
            <TabPane index="2" label="預約時段" key="2">
              <ReservationWrapper>
                <TimeSlotWrapper style={{ ...(isMobile && { maxHeight: '450px' }) }}>
                  <FilterWrapper>
                    <Radio.Group
                      defaultValue={courts?.data?.[0]?.id}
                      buttonStyle="solid"
                      onChange={(e) => setCourtId(Number(e.target.value))}
                    >
                      {courts?.data?.map((court) => (
                        <Radio.Button value={court.id} key={court.id}>
                          {`${court.number} ${venue?.data?.court_type}`}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </FilterWrapper>
                  <RippleButton
                    category="icon"
                    palette="gray"
                    style={{ gridColumn: '1/2', gridRow: '2/3' }}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    <LeftArrowIcon />
                  </RippleButton>
                  {businessHour?.data && (
                    <TimeSlot
                      {...{
                        cells,
                        handleUnitMouseDown,
                        handleUnitMouseEnter,
                        date: dates,
                        timeRange,
                      }}
                      reservationInfos={data?.data?.reservations}
                      style={{ gridColumn: '2/3', gridRow: '2/3' }}
                      isLoading={loadingCourtReservations}
                    />
                  )}
                  <RippleButton
                    category="icon"
                    palette="gray"
                    style={{ gridColumn: '3/4', gridRow: '2/3' }}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    <RightArrowIcon />
                  </RippleButton>
                </TimeSlotWrapper>
              </ReservationWrapper>
            </TabPane>
          ) : undefined}
          <TabPane index="3" label="相簿" key="3">
            <AlbumWrapper>
              {album?.data?.map(({ url }, index) => (
                <ImagePreview
                  key={index}
                  src={url}
                  placeholder={<ImagePreview preview={false} />}
                />
              ))}
            </AlbumWrapper>
          </TabPane>
        </Tabs>
      </ContentWrapper>
    </>
  );
}
