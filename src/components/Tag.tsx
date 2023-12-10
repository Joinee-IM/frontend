import styled from 'styled-components';

import { MOBILE_WITH } from '@/constants/rwd';
import { flexCenter, percentageOfFigma } from '@/utils/css';

export const SquareTag = styled.div`
  font-size: ${percentageOfFigma(20).max};
  padding: 0.375em 0.75em;
  @media (max-width: ${MOBILE_WITH}px) {
    font-size: min(15px, ${percentageOfFigma(20).max});
  }
  border-radius: 0.5em;
  color: ${({ theme }) => theme.white};
  ${flexCenter};
  column-gap: 0.8em;
`;

export const RoundTag = styled.div`
  ${flexCenter}
  height: 30px;
  padding: 0 12px;
  border-radius: 16px;
  background: #cbc09f;
  color: white;
  flex-shrink: 0;
`;

export const RoundTagWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  overflow: hidden;
`;
