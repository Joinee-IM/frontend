import styled from 'styled-components';

import { hexToRgb } from '@/utils';
import { percentageOfFigma, rwdFontSize } from '@/utils/css';

export const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px ${hexToRgb('#000000', 0.25)};
  padding: ${percentageOfFigma(40).max} ${percentageOfFigma(50).max};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: ${percentageOfFigma(50).max};
  flex: 1;
`;

export const Title = styled.div`
  ${rwdFontSize(30)};
  font-weight: 600;
`;
