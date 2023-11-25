import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Background from '@/assets/background.jpg';
import { RippleButton } from '@/components';
import Title from '@/components/Title';
import useClick from '@/view/hooks/useClick';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.main[500]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 10px;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.white};
`;

const MenuWrapper = styled.div`
  height: 100%;
  width: 100px;
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 8px;
`;

const MenuItem = styled(RippleButton)`
  height: 100%;
  font-size: clamp(14px, 1.27vw, 20px);
  font-weight: 400;
`;

const ContentContainer = styled.div<{ hasBackground?: boolean }>`
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
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
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
  useClick();

  return (
    <Container>
      <HeaderWrapper>
        <Title style={{ fontSize: 'max(24px, 1.9vw)' }} />
        <MenuWrapper>
          <MenuItem type="link" category="link" palette="main">
            尋找場地
          </MenuItem>
          <MenuItem type="link" category="link" palette="main">
            尋找球友
          </MenuItem>
          <MenuItem type="link" category="link" palette="main">
            <BellOutlined />
          </MenuItem>
          <MenuItem
            type="link"
            category="link"
            palette="main"
            onClick={() => navigate('/auth/login')}
          >
            <UserOutlined />
          </MenuItem>
        </MenuWrapper>
      </HeaderWrapper>
      <ContentContainer>
        <ScrollContainer>
          <Outlet />
        </ScrollContainer>
      </ContentContainer>
    </Container>
  );
}
