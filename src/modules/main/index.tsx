import { useCookies } from 'react-cookie';
import { Outlet, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Background from '@/assets/background.jpg';
import MODULE_TO_ROUTE from '@/constants/module';
import useRoutes from '@/hooks/useRoutes';
import Manage from '@/modules/lessor/pages/Manage';
import Header from '@/modules/main/components/Header';
import { Stadium } from '@/modules/main/pages';
import { backgroundCenter } from '@/utils/css';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['hasBackground'].includes(prop),
})<{ hasBackground: boolean }>`
  flex: 1;
  width: 100%;
  position: relative;
  overflow: scroll;
  ${({ hasBackground = false }) =>
    hasBackground &&
    css`
      &::before {
        content: '';
        background-image: url(${Background});
        ${backgroundCenter}
        position: absolute;
        inset: 0;
        opacity: 0.5;
        z-index: -1;
      }
    `}
`;

const ScrollContainer = styled.div`
  height: 100%;
  overflow: scroll;
`;

export default function Main() {
  const { pathname } = useLocation();
  useRoutes();

  return (
    <Container>
      <Header />
      <ContentContainer
        hasBackground={MODULE_TO_ROUTE.background.some((path) => path.test(pathname))}
      >
        <ScrollContainer>
          <Outlet />
        </ScrollContainer>
      </ContentContainer>
    </Container>
  );
}

export const Home = () => {
  const [cookie] = useCookies(['id', 'user-role']);
  return cookie['user-role'] === 'PROVIDER' ? <Manage /> : <Stadium />;
};
