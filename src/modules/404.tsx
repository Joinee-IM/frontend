import styled from 'styled-components';

import Image404 from '@/assets/404Alter1.gif';
import { hexToRgb } from '@/utils';
import { flexCenter } from '@/utils/css';

const WhiteScreenOpacity = styled.div`
  background-color: ${hexToRgb('#ede4db', 1)};
  width: 100vw;
  height: 100vh;
  ${flexCenter}
  font-size: 15vw;
`;

const Content = styled.div`
  font-family: 'Cherry Bomb One';
  font-size: 13vw;
`;

export default function NotFound() {
  return (
    // <Background>
    <WhiteScreenOpacity>
      <Content>404</Content>
      <img src={Image404} style={{ width: '40%', height: '65%', objectFit: 'cover' }} />
    </WhiteScreenOpacity>
    // </Background>
  );
}
