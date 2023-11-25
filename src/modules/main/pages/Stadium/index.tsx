import { useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components';

import { PageTitle } from '@/components/Title';
import ListItem from '@/modules/main/pages/Stadium/components/ListItem';

const Container = styled.div`
  padding: 60px clamp(30px, 12.7vw, 200px);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const MapContainer = styled.div`
  flex: 1;
  height: 500px;
`;

const ListContainer = styled.div`
  flex: 0.8;
  border: 1px solid ${({ theme }) => theme.gray[300]};
`;

export default function Stadium() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: String(import.meta.env.REACT_APP_GOOGLE_API_KEY),
  });
  console.log(isLoaded);
  // const center = useMemo(() => ({ lat: 25, lng: 121 }), []);

  return (
    <Container>
      <PageTitle>尋找場館</PageTitle>
      <ContentContainer>
        <MapContainer>
          {/* {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
            center={center}
            zoom={10}
          />
        )} */}
          <h1>Loading...</h1>
        </MapContainer>
        <ListContainer>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </ListContainer>
      </ContentContainer>
    </Container>
  );
}
