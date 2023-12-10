import { Container, PageTitle } from '@/modules/main/components';
import Gallery from '@/modules/main/pages/Venue/components/Gallery';

export default function VenueList() {
  return (
    <Container style={{ height: 'auto' }}>
      <PageTitle>臺大體育館 / 尋找場地</PageTitle>
      <Gallery />
    </Container>
  );
}
