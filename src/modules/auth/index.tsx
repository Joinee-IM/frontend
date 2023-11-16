export { default as Login } from './pages/login';
export { default as Signup } from './pages/signup';
export { default as ChooseRole } from './pages/signup/ChooseRole';

import { Outlet } from 'react-router-dom';
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
`;

export default function Auth() {
  return (
    <Background style={{ position: 'relative' }}>
      <WhiteScreenOpacity>
        <Outlet />
      </WhiteScreenOpacity>
    </Background>
  );
}