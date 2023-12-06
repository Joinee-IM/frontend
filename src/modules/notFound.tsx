import styled from 'styled-components';

import { Background } from '@/modules/entry/components/Cover';
import { hexToRgb } from '@/utils';
import { flexCenter } from '@/utils/css';

const WhiteScreenOpacity = styled.div`
  background-color: ${hexToRgb('#FFFFFF', 0.5)};
  width: 100%;
  height: 100%;
  position: absolute;
  ${flexCenter}
  font-size: 15vw;
`;
export default function NotFound() {
  return (
    <Background>
      <WhiteScreenOpacity>404</WhiteScreenOpacity>
    </Background>
  );
}
