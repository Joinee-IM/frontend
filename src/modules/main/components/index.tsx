import styled from 'styled-components';

import { percentageOfFigma } from '@/utils/css';

export const PageTitle = styled.div`
  font-size: max(20px, 2.29vw);
  font-weight: 600;
  letter-spacing: 1.8px;
`;

export const Container = styled.div`
  padding: 6vh clamp(30px, 12.7vw, 200px);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  row-gap: ${percentageOfFigma(36).max};
`;
