// This file is to render components tested. Don't move it! Just import component and use.
import styled from 'styled-components';

const Background = styled.div`
  max-width: 100vw;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Component = () => <></>;

export default function View() {
  return (
    <Background>
      <Component />
    </Background>
  );
}
