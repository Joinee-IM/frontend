import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { RippleButton } from '@/components/Button';
import Select from '@/components/Select';
import Title from '@/components/Title';
import MODULE_TO_ROUTE from '@/constants/module';
import { useLogout } from '@/modules/auth/service';
import { percentageOfFigma } from '@/utils/css';

type UserSelect = '歷史紀錄' | '個人檔案' | '登出';
type ManagerSelect = '新增場館' | '新增場地' | '新增小單位';

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
  font-weight: bold;
  color: gray;
`;

const userSelect: UserSelect[] = ['歷史紀錄', '個人檔案', '登出'];
const managerSelect: ManagerSelect[] = ['新增場館', '新增場地', '新增小單位'];

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['id', 'user-role']);
  const { mutate: logout } = useLogout();

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

  const handleUserSelect = useCallback(
    (key: UserSelect) => {
      switch (key) {
        case '歷史紀錄':
          navigate(`/history/${cookies.id}`);
          break;
        case '個人檔案':
          navigate(`/user-info/${cookies.id}`);
          break;
        case '登出':
          logout(undefined, {
            onSuccess: () => {
              removeCookie('id');
              removeCookie('user-role');
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

  return (
    <HeaderWrapper>
      <Title />
      <MenuWrapper>
        {cookies['user-role'] === 'PROVIDER' ? (
          <>
            <MenuItemWrapper
              selected={MODULE_TO_ROUTE.managerCrate.some((path) => path.test(pathname))}
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
                <MenuItem
                  type="link"
                  category="link"
                  palette={
                    MODULE_TO_ROUTE.managerCrate.some((path) => path.test(pathname))
                      ? 'main'
                      : 'gray'
                  }
                >
                  新增設施
                </MenuItem>
              </Select>
            </MenuItemWrapper>
            <MenuItemWrapper selected={MODULE_TO_ROUTE.manage.some((path) => path.test(pathname))}>
              <MenuItem
                type="link"
                category="link"
                palette={
                  MODULE_TO_ROUTE.manage.some((path) => path.test(pathname)) ? 'main' : 'gray'
                }
                onClick={() => navigate(`/manage/${cookies.id}`)}
              >
                管理現有設施
              </MenuItem>
            </MenuItemWrapper>
          </>
        ) : (
          <>
            <MenuItemWrapper selected={MODULE_TO_ROUTE.stadium.some((path) => path.test(pathname))}>
              <MenuItem
                type="link"
                category="link"
                palette={
                  MODULE_TO_ROUTE.stadium.some((path) => path.test(pathname)) ? 'main' : 'gray'
                }
                onClick={() => navigate(`/`)}
              >
                尋找場地
              </MenuItem>
            </MenuItemWrapper>
            <MenuItemWrapper selected={MODULE_TO_ROUTE.partner.some((path) => path.test(pathname))}>
              <MenuItem
                type="link"
                category="link"
                palette={
                  MODULE_TO_ROUTE.partner.some((path) => path.test(pathname)) ? 'main' : 'gray'
                }
                onClick={() => navigate(`/partner`)}
              >
                尋找球友
              </MenuItem>
            </MenuItemWrapper>
            <MenuItem type="link" category="link" palette="main">
              <BellOutlined />
            </MenuItem>
          </>
        )}
        <Select
          selectedKeys={[]}
          items={userSelect.map((label) => ({
            label,
            key: label,
          }))}
          onSelect={({ key }) => handleUserSelect(key as UserSelect)}
        >
          <MenuItem
            type="link"
            category="link"
            palette="main"
            onClick={() => {
              !cookies.id && navigate('/auth/login');
            }}
          >
            <UserOutlined />
          </MenuItem>
        </Select>
      </MenuWrapper>
    </HeaderWrapper>
  );
}
