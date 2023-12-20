import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { getDay, parse } from 'date-fns';
import { isNil } from 'lodash';
import { median } from 'mathjs';
import { Fragment, useMemo, useState } from 'react';
import styled from 'styled-components';

import BallIcon from '@/assets/icons/Ball';
import BuildingIcon from '@/assets/icons/Building';
import CalendarIcon from '@/assets/icons/Calendar';
import PositionIcon from '@/assets/icons/Position';
import { RippleButton } from '@/components';
import { useDateTimePicker } from '@/components/DateTimePicker';
import DateTimePickerModal from '@/components/DateTimePicker/Modal';
import { FullContainerLoading } from '@/components/Loading/RippleLoading';
import Select from '@/components/Select';
import { useScrollToEnd } from '@/hooks/useElement';
import useError from '@/hooks/useError';
import useFilter from '@/hooks/useFilter';
import useGeoLocation from '@/hooks/useGeoLocation';
import { Container, PageTitle } from '@/modules/main/components';
import Filter from '@/modules/main/components/Filter';
import DetailModal from '@/modules/main/pages/Stadium/components/DetailModal';
import ListItem from '@/modules/main/pages/Stadium/components/ListItem';
import { useBrowseStadium } from '@/modules/main/pages/Stadium/services';
import theme from '@/provider/theme/theme';
import { useCity, useDistrict, useSports } from '@/services/useFilters';

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

const StadiumsContainer = styled.div`
  flex: 1;
  flex-basis: 400px;
  overflow: hidden;
  max-height: max(400px, 60vh);
  position: relative;
  aspect-ratio: 1;
  border: 1px solid ${({ theme }) => theme.gray[300]};
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
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
  const { latitude, longitude } = useGeoLocation();
  const onLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    stadiums?.forEach(({ lat, long: lng }) => bounds.extend({ lat, lng }));
    if (!isNil(latitude) && !isNil(longitude)) bounds.extend({ lat: latitude, lng: longitude });
    map.fitBounds(bounds);
  };

  const center = useMemo(
    () => ({
      lat:
        latitude ??
        (stadiums?.length ? median(stadiums.map((stadium) => stadium.lat)) : 25.01755436724564),
      lng:
        longitude ??
        (stadiums?.length ? median(stadiums?.map((stadium) => stadium.long)) : 21.53976252477511),
    }),
    [latitude, longitude, stadiums],
  );
  const [markerFocus, setMarkerFocus] = useState(0);
  const [itemHover, setItemHover] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollElement = useScrollToEnd(() => {
    if (hasNextPage) {
      void fetchNextPage();
    }
  });

  const { context } = useError(
    stadiums?.length ?? !isFetched ? null : new Error('NoMatch'),
    { NoMatch: '沒有符合條件的場館' },
    clearFilter,
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
                loading={loadingDistrict && city !== undefined}
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
              <DateTimePickerModal
                dateTimePickerProps={{ date, setDate, focus, setFocus, times, setTimes }}
                open={calendarOpen}
                setOpen={setCalendarOpen}
                handleCancel={clearCalendar}
                handleOk={() => {
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
              />
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
                      onClick={() => {
                        setMarkerFocus(id);
                      }}
                      animation={
                        id === markerFocus || id === itemHover
                          ? google.maps.Animation.BOUNCE
                          : undefined
                      }
                      key={id}
                      position={{ lat, lng }}
                    >
                      {id === markerFocus || id === itemHover ? (
                        <InfoWindowF onCloseClick={() => setMarkerFocus(0)} position={{ lat, lng }}>
                          <div>{name}</div>
                        </InfoWindowF>
                      ) : null}
                    </MarkerF>
                  ))}
                </GoogleMap>
              )}
            </MapContainer>

            <StadiumsContainer>
              {isFetching && <FullContainerLoading />}
              <ListContainer ref={scrollElement}>
                {stadiums?.map(({ id, name, business_hours, city, district, sports }) => (
                  <Fragment key={id}>
                    <ListItem
                      markerFocus={markerFocus === id}
                      handleMouseEnter={() => {
                        setItemHover(id);
                        setMarkerFocus(0);
                      }}
                      handleMouseLeave={() => setItemHover(0)}
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
                    <div
                      style={{ width: '100%', height: '1px', backgroundColor: theme.gray[100] }}
                    />
                  </Fragment>
                ))}
              </ListContainer>
            </StadiumsContainer>
          </ContentContainer>
        </Filter>
        <DetailModal stadiumId={stadiumId} open={modalOpen} onCancel={() => setModalOpen(false)} />
      </Container>
    </>
  );
}
