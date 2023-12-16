import { useParams } from 'react-router-dom';

import { Container, PageTitle } from '@/modules/main/components';
import { useStadiumInfo } from '@/modules/main/pages/Stadium/services';
import Gallery from '@/modules/main/pages/Venue/components/Gallery';

export default function VenueList() {
  const { stadium_id } = useParams();
  const { data: info } = useStadiumInfo(Number(stadium_id));
  return (
    <Container style={{ height: 'auto' }}>
      <PageTitle>{info?.data?.name} / 尋找場地</PageTitle>
      <Gallery />
    </Container>
  );
}
