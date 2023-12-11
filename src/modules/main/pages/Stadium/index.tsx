import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Modal } from 'antd';
import { getDay, parse } from 'date-fns';
import { debounce } from 'lodash';
import { median } from 'mathjs';
import { Fragment, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import BallIcon from '@/assets/icons/Ball';
import BuildingIcon from '@/assets/icons/Building';
import CalendarIcon from '@/assets/icons/Calendar';
import PositionIcon from '@/assets/icons/Position';
import { ButtonWrapper, RippleButton } from '@/components';
import DateTimePicker, { useDateTimePicker } from '@/components/DateTimePicker';
import Loading from '@/components/Loading';
import Select from '@/components/Select';
import useElement, { useResizeObserver, useScrollObserver } from '@/hooks/useElement';
import useError from '@/hooks/useError';
import useFilter from '@/hooks/useFilter';
import { Container, PageTitle } from '@/modules/main/components';
import Filter from '@/modules/main/components/Filter';
import DetailModal from '@/modules/main/pages/Stadium/components/DetailModal';
import ListItem from '@/modules/main/pages/Stadium/components/ListItem';
import { useBrowseStadium } from '@/modules/main/pages/Stadium/services';
import theme from '@/provider/theme/theme';
import { useCity, useDistrict, useSports } from '@/services/useFilters';
import { hexToRgb } from '@/utils';
import { flexCenter } from '@/utils/css';

const ContentContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MapContainer = styled.div`
  flex: 1;
  flex-basis: 400px;
  max-height: max(400px, 60vh);
  aspect-ratio: 1;
`;

const ListContainer = styled.div`
  flex: 1;
  flex-basis: 400px;
  overflow: scroll;
  max-height: max(400px, 60vh);
  position: relative;
  aspect-ratio: 1;
  border: 1px solid ${({ theme }) => theme.gray[300]};
`;

const LoadingWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['width', 'height', 'top', 'left'].includes(prop),
})<{ width: number; height: number; left: number; top: number }>`
  background-color: ${hexToRgb('#000000', 0.5)};
  position: fixed;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  ${flexCenter}
`;

export default function Stadium() {
  const {
    city,
    setCity,
    district,
    setDistrict,
    sport,
    setSport,
    name,
    setName,
    timeRanges,
    setTimeRanges,
    clear,
  } = useFilter();
  const { width, setWidth, height, setHeight, top, setTop, left, setLeft, element } = useElement();
  const [word, setWord] = useState<string | undefined>(undefined);
  const { data: cities, isLoading: loadingCity } = useCity();
  const { data: districts, isLoading: loadingDistrict } = useDistrict(city ?? 0);
  const { data: sports } = useSports();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [stadiumId, setStadiumId] = useState(0);
  const {
    date,
    setDate,
    focus,
    setFocus,
    times,
    setTimes,
    clear: clearCalendar,
  } = useDateTimePicker();

  const clearFilter = () => {
    setWord(undefined);
    clearCalendar();
    clear();
  };

  useResizeObserver(element.current, (e) => {
    const style = e.target.getBoundingClientRect();
    setWidth(style.width);
    setHeight(style.height);
    setTop(style.top);
    setLeft(style.left);
  });

  useScrollObserver(element.current, (e) => {
    const style = e.target.getBoundingClientRect();
    setWidth(style.width);
    setHeight(style.height);
    setTop(style.top);
    setLeft(style.left);
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: String(import.meta.env.VITE_APP_GOOGLE_MAP_KEY),
  });
  const { stadiums, fetchNextPage, hasNextPage, isFetching, isFetched } = useBrowseStadium({
    limit: 5,
    offset: 0,
    city_id: city,
    district_id: district,
    sport_id: sport,
    name,
    time_ranges: timeRanges,
  });
  const onLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    stadiums?.forEach(({ lat, long: lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };
  const center = useMemo(
    () => ({
      lat: stadiums?.length ? median(stadiums.map((stadium) => stadium.lat)) : 25.01755436724564,
      lng: stadiums?.length ? median(stadiums?.map((stadium) => stadium.long)) : 21.53976252477511,
    }),
    [stadiums],
  );
  const [markerFocus, setMarkerFocus] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToEnd = useMemo(
    () =>
      debounce(() => {
        if (element.current)
          if (
            Math.abs(
              element.current.scrollHeight -
                element.current.scrollTop -
                element.current.clientHeight,
            ) < 1 &&
            hasNextPage
          ) {
            void fetchNextPage();
          }
      }, 200),
    [element, fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const target = element.current;
    target?.addEventListener('scroll', scrollToEnd);
    return () => {
      target?.removeEventListener('scroll', scrollToEnd);
    };
  }, [element, scrollToEnd]);

  const { context } = useError(
    stadiums?.length ?? !isFetched ? null : new Error('NoMatch'),
    { NoMatch: '沒有符合條件的場館' },
    clearFilter,
  );

  const Footer = useMemo(
    () => (
      <ButtonWrapper>
        <RippleButton category="outlined" palette="gray" onClick={clearCalendar}>
          清除
        </RippleButton>
        <RippleButton
          category="solid"
          palette="main"
          onClick={() => {
            setTimeRanges(
              Object.entries(times)
                .map(([date, times]) =>
                  times.map((time) => ({
                    weekday: getDay(parse(date, 'yyyy/MM/dd', new Date())),
                    start_time: time.split('-')[0],
                    end_time: time.split('-')[1],
                  })),
                )
                .flat(),
            );
            setCalendarOpen(false);
          }}
        >
          篩選時間
        </RippleButton>
      </ButtonWrapper>
    ),
    [clearCalendar, setTimeRanges, times],
  );

  return (
    <>
      {context}
      <Container>
        <PageTitle>尋找場館</PageTitle>
        <Filter
          searchable={true}
          word={word}
          setWord={setWord}
          filters={
            <>
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
                title="運動項目"
                selectedKeys={sport ? [String(sport)] : []}
                icon={<BallIcon />}
                items={sports?.data?.map((sport) => ({
                  label: sport.name,
                  key: String(sport.id),
                }))}
                onSelect={({ key }) => setSport(Number(key))}
              />
              {' ・ '}
              <RippleButton category="icon" palette="gray" onClick={() => setCalendarOpen(true)}>
                <CalendarIcon fontSize="0.5em" />
              </RippleButton>
              <Modal
                centered
                open={calendarOpen}
                footer={Footer}
                onCancel={() => setCalendarOpen(false)}
                width={'fit-content'}
                closable={false}
              >
                <DateTimePicker
                  {...{ date, setDate, focus, setFocus, times, setTimes }}
                ></DateTimePicker>
              </Modal>
            </>
          }
          onClose={clearFilter}
          onSearch={(name) => setName(name)}
        >
          <ContentContainer>
            <MapContainer>
              {!isLoaded && center ? (
                <h1>Loading...</h1>
              ) : (
                <GoogleMap
                  mapContainerStyle={{ height: '100%', width: '100%' }}
                  center={center}
                  onLoad={onLoad}
                  key={stadiums?.join()}
                >
                  {stadiums?.map(({ name, id, lat, long: lng }) => (
                    <MarkerF
                      // onMouseOver={() => setMarkerFocus(id)}
                      // onMouseOut={() => setMarkerFocus(0)}
                      onClick={() => {
                        setMarkerFocus(id);
                      }}
                      animation={id === markerFocus ? google.maps.Animation.BOUNCE : undefined}
                      key={id}
                      position={{ lat, lng }}
                    >
                      {id === markerFocus ? (
                        <InfoWindowF onCloseClick={() => setMarkerFocus(0)} position={{ lat, lng }}>
                          <div>{name}</div>
                        </InfoWindowF>
                      ) : null}
                    </MarkerF>
                  ))}
                </GoogleMap>
              )}
            </MapContainer>

            <ListContainer ref={element}>
              {isFetching && (
                <LoadingWrapper width={width} height={height} top={top} left={left}>
                  <Loading />
                </LoadingWrapper>
              )}
              {stadiums?.map(({ id, name, business_hours, city, district, sports }) => (
                <Fragment key={id}>
                  <ListItem
                    markerFocus={markerFocus === id}
                    handleMouseEnter={() => setMarkerFocus(id)}
                    handleMouseLeave={() => setMarkerFocus(0)}
                    title={name}
                    address={city + district}
                    times={business_hours}
                    tags={sports}
                    stadium_id={id}
                    onClick={() => {
                      setModalOpen(true);
                      setStadiumId(id);
                    }}
                  />
                  <div style={{ width: '100%', height: '1px', backgroundColor: theme.gray[100] }} />
                </Fragment>
              ))}
            </ListContainer>
          </ContentContainer>
        </Filter>
        <DetailModal stadiumId={stadiumId} open={modalOpen} onCancel={() => setModalOpen(false)} />
      </Container>
    </>
  );
}
