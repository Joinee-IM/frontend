import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { debounce } from 'lodash';
import { median } from 'mathjs';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import Select from '@/components/Select';
import { Container, PageTitle } from '@/modules/main/components';
import Filter from '@/modules/main/components/Filter';
import DetailModal from '@/modules/main/pages/Stadium/components/DetailModal';
import ListItem from '@/modules/main/pages/Stadium/components/ListItem';
import { useBrowseStadium } from '@/modules/main/pages/Stadium/services';
import theme from '@/provider/theme/theme';

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
  /* max-height: 200px; */
  aspect-ratio: 1;
  border: 1px solid ${({ theme }) => theme.gray[300]};
`;

export default function Stadium() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: String(import.meta.env.VITE_APP_GOOGLE_MAP_KEY),
  });
  const { stadiums, fetchNextPage, hasNextPage } = useBrowseStadium({ limit: 5, offset: 0 });
  const onLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    stadiums?.forEach(({ lat, long: lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };
  const center = useMemo(
    () => ({
      lat: median(stadiums?.map((stadium) => stadium.lat) ?? [25.01755436724564]),
      lng: median(stadiums?.map((stadium) => stadium.long) ?? [121.53976252477511]),
    }),
    [stadiums],
  );
  const element = useRef<HTMLDivElement>(null);
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
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const target = element.current;
    target?.addEventListener('scroll', scrollToEnd);
    return () => {
      target?.removeEventListener('scroll', scrollToEnd);
    };
  }, [scrollToEnd]);

  return (
    <Container>
      <PageTitle>尋找場館</PageTitle>
      <Filter
        filters={
          <>
            <Select
              title="縣市"
              items={[
                {
                  label: '台北市',
                  key: '0', //string
                },
              ]}
            />
            <Select
              title="行政區"
              items={[
                {
                  label: '大安區',
                  key: '0', //string
                },
                {
                  label: '中正區',
                  key: '1', //string
                },
                {
                  label: '內湖區',
                  key: '2', //string
                },
                {
                  label: '松山區',
                  key: '3', //string
                },
              ]}
            />
            <Select
              title="運動項目"
              items={[
                {
                  label: '桌球',
                  key: '0', //string
                },
                {
                  label: '羽球',
                  key: '1', //string
                },
                {
                  label: '壁球',
                  key: '2', //string
                },
                {
                  label: '柔道',
                  key: '3', //string
                },
                {
                  label: '舞蹈',
                  key: '4', //string
                },
              ]}
            />
          </>
        }
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
                  onClick={() => setModalOpen(true)}
                />
                <div style={{ width: '100%', height: '1px', backgroundColor: theme.gray[100] }} />
              </Fragment>
            ))}
          </ListContainer>
        </ContentContainer>
      </Filter>
      <DetailModal open={modalOpen} onCancel={() => setModalOpen(false)} />
    </Container>
  );
}
