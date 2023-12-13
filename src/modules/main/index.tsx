import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Background from '@/assets/background.jpg';
import { RippleButton } from '@/components';
import Select from '@/components/Select';
import Title from '@/components/Title';
import MODULE_TO_ROUTE from '@/constants/module';
import { useUser } from '@/contexts/useUser';
import { useLogout } from '@/modules/auth/service';
import { useUserInfo } from '@/modules/main/pages/UserInfo/services';
import { backgroundCenter, percentageOfFigma } from '@/utils/css';
import useClick from '@/view/hooks/useClick';

type UserSelect = '歷史紀錄' | '個人檔案' | '登出';
type ManagerSelect = '新增場館' | '新增場地' | '新增小單位';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  height: ${percentageOfFigma(80).max};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.main[500]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px ${percentageOfFigma(32).max};
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

const MenuItemWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['hasBackground'].includes(prop),
})<{ selected?: boolean }>`
  height: 100%;
  box-sizing: border-box;
  border-bottom: 4px solid ${({ selected, theme }) => (selected ? theme.main[500] : 'transparent')};
`;

const MenuItem = styled(RippleButton).withConfig({
  shouldForwardProp: (prop) => !['hasBackground'].includes(prop),
})<{ selected: boolean }>`
  height: 100%;
  font-size: clamp(14px, 1.27vw, 20px);
  font-weight: 400;
  box-sizing: border-box;
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
  const { user } = useUser();
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const account_id = searchParams.get('account_id') as unknown as number;
  const { mutate: logout } = useLogout();
  useClick();
  useEffect(() => {
    if (account_id) {
      setCookie('id', account_id, { path: '/' });
      navigate('/');
    }
  }, [account_id, navigate, setCookie]);

  const { data: account } = useUserInfo(Number(cookies.id));

  const userSelect: UserSelect[] = useMemo(() => ['歷史紀錄', '個人檔案', '登出'], []);
  const managerSelect: ManagerSelect[] = useMemo(() => ['新增場館', '新增場地', '新增小單位'], []);
  const handleUserSelect = useCallback(
    (key: UserSelect) => {
      switch (key) {
        case '歷史紀錄':
          break;
        case '個人檔案':
          navigate(`/user-info/${cookies.id}`);
          break;
        case '登出':
          logout(undefined, {
            onSuccess: () => {
              removeCookie('id');
              navigate('/entry');
            },
          });
          break;
        default:
          break;
      }
    },
    [cookies.id, logout, navigate, removeCookie],
  );
  const handleLessorSelect = useCallback(
    (key: ManagerSelect) => {
      switch (key) {
        case '新增場館':
          navigate(`/manage/${cookies.id}/create/stadium`);
          break;
        case '新增場地':
          break;
        case '新增小單位':
          break;
        default:
          break;
      }
    },
    [cookies.id, navigate],
  );

  const menu = useMemo(
    () =>
      account?.data && (
        <>
          {account.data?.role === 'NORMAL' ? (
            <>
              <MenuItemWrapper
                selected={MODULE_TO_ROUTE.stadium.some((path) => path.test(pathname))}
              >
                <MenuItem type="link" category="link" palette="main">
                  尋找場地
                </MenuItem>
              </MenuItemWrapper>
              <MenuItem type="link" category="link" palette="main">
                尋找球友
              </MenuItem>
              <MenuItem type="link" category="link" palette="main">
                <BellOutlined />
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItemWrapper
                selected={MODULE_TO_ROUTE.manager.some((path) => path.test(pathname))}
              >
                <Select
                  selectedKeys={[]}
                  items={managerSelect.map((label) => ({
                    label,
                    key: label,
                  }))}
                  onSelect={({ key }) => {
                    handleLessorSelect(key as ManagerSelect);
                  }}
                >
                  <MenuItem type="link" category="link" palette="main">
                    新增設施
                  </MenuItem>
                </Select>
              </MenuItemWrapper>
              <MenuItemWrapper>
                <MenuItem
                  type="link"
                  category="link"
                  palette="main"
                  onClick={() => navigate(`/manage/${cookies.id}`)}
                >
                  管理現有設施
                </MenuItem>
              </MenuItemWrapper>
            </>
          )}
          <Select
            selectedKeys={[]}
            items={userSelect.map((label) => ({
              label,
              key: label,
            }))}
            onSelect={({ key }) => {
              handleUserSelect(key as UserSelect);
            }}
          >
            <MenuItem
              type="link"
              category="link"
              palette="main"
              onClick={() => {
                !user?.login && navigate('/auth/login');
              }}
            >
              <UserOutlined />
            </MenuItem>
          </Select>
        </>
      ),
    [
      account?.data,
      cookies.id,
      handleLessorSelect,
      handleUserSelect,
      managerSelect,
      navigate,
      pathname,
      user?.login,
      userSelect,
    ],
  );

  return (
    <Container>
      <HeaderWrapper>
        <Title />
        <MenuWrapper>{menu}</MenuWrapper>
      </HeaderWrapper>
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
