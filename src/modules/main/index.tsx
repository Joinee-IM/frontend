import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Background from '@/assets/background.jpg';
import { RippleButton } from '@/components';
import Title from '@/components/Title';
import useClick from '@/view/hooks/useClick';

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  height: 100%;
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
  .card {
    padding: 2em;
  }

  .read-the-docs {
    color: #888;
  }
`;

const HeaderWrapper = styled.div`
  z-index: 10000;
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
  column-gap: 8px;
`;

const MenuItem = styled(RippleButton)`
  height: 100%;
  font-size: max(14px, 1.27vw);
  font-weight: 400;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
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
`;

export default function Main() {
  const navigate = useNavigate();
  useClick();

  return (
    <Container>
      <HeaderWrapper>
        <Title style={{ fontSize: 'max(24px, 1.9vw)' }} />
        <MenuWrapper>
          <MenuItem type="link" palette="main">
            尋找場地
          </MenuItem>
          <MenuItem type="link" palette="main">
            尋找球友
          </MenuItem>
          <MenuItem type="link" palette="main">
            <BellOutlined />
          </MenuItem>
          <MenuItem type="link" palette="main" onClick={() => navigate('/auth/login')}>
            <UserOutlined />
          </MenuItem>
        </MenuWrapper>
      </HeaderWrapper>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </Container>
  );
}
