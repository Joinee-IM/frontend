// This file is to render components tested. Don't move it! Just import component and use.
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import routes from '@/view/route';

const Background = styled.div`
  max-width: 100vw;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.ul`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`;

export default function View() {
  return (
    <Background>
      <List>
        {routes.map((route, index) => (
          <Link key={index} to={`/view/${route.path}`} relative="path">
            {route.path}
          </Link>
        ))}
      </List>
      <Outlet />
    </Background>
  );
}
