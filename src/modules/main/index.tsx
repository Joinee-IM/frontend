import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Background from '@/assets/background.jpg';
import MODULE_TO_ROUTE from '@/constants/module';
import Header from '@/modules/main/components/Header';
import { backgroundCenter } from '@/utils/css';
import useClick from '@/view/hooks/useClick';

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
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['id', 'user-role']);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const account_id = searchParams.get('account_id') as unknown as number;
  useClick();
  useEffect(() => {
    // for google login
    if (account_id) {
      setCookie('id', account_id, { path: '/' });
      navigate('/');
    }
  }, [account_id, navigate, setCookie]);

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
