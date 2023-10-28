import styled from 'styled-components';

import Cover from '@/modules/entry/components/Cover';
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

export default function Entry() {
  return (
    <Container>
      <Cover></Cover>
    </Container>
  );
}
