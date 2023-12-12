import styled from 'styled-components';

import { MOBILE_WITH } from '@/constants/rwd';
import { flexCenter, percentageOfFigma, rwdFontSize } from '@/utils/css';

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
  ${rwdFontSize(14)};
  padding: 0.5em 1em;
  border-radius: 1.3em;
  background: #cbc09f;
  color: white;
  flex-shrink: 0;
`;

export const RoundTagWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  overflow: hidden;
`;
