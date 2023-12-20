import styled from 'styled-components';

import { flexCenter, percentageOfFigma, rwdFontSize } from '@/utils/css';

export const SquareTag = styled.div`
  ${rwdFontSize(20)};
  line-height: 1em;
  padding: 0.5em 0.8em;
  border-radius: 0.5em;
  color: ${({ theme }) => theme.white};
  ${flexCenter};
  column-gap: 0.8em;
`;

export const RoundTag = styled.div`
  ${flexCenter}
  ${rwdFontSize(14)};
  line-height: 1em;
  padding: 0.5em 1em;
  border-radius: 1.3em;
  background: ${({ theme }) => theme.dirt};
  color: white;
  flex-shrink: 0;
  column-gap: ${10 / 14}em;
`;

export const RoundTagWrapper = styled.div`
  display: flex;
  column-gap: ${percentageOfFigma(6).max};
  overflow: hidden;
`;
