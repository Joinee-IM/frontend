import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { range } from 'lodash';
import { useMemo } from 'react';
import styled from 'styled-components';

import { Container, PageTitle } from '@/modules/main/components';
import ListItem from '@/modules/main/pages/Stadium/components/ListItem';

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
  aspect-ratio: 1;
  border: 1px solid ${({ theme }) => theme.gray[300]};
`;

export default function Stadium() {
  console.log(import.meta.env.REACT_APP_GOOGLE_API_KEY);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: String(import.meta.env.VITE_APP_GOOGLE_MAP_KEY),
  });
  console.log(isLoaded);
  const center = useMemo(() => ({ lat: 35.71187961245162, lng: 139.77431459582516 }), []);
  // const onLoad = (map: google.maps.Map) => {
  //   const bounds = new google.maps.LatLngBounds();
  //   [center]?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
  //   map.fitBounds(bounds);
  // };

  return (
    <Container>
      <PageTitle>尋找場館</PageTitle>
      <ContentContainer>
        <MapContainer>
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%' }}
              center={center}
              zoom={18}
              // onLoad={onLoad}
            >
              <MarkerF label={'敘敘苑'} position={center} />
              <MarkerF label={{ text: '上野動物園', color: 'white' }} position={center} />
            </GoogleMap>
          )}
        </MapContainer>
        <ListContainer>
          {range(10).map((m) => (
            <ListItem key={m} />
          ))}
        </ListContainer>
      </ContentContainer>
    </Container>
  );
}
