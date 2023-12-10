import styled, { css } from 'styled-components';

import type { CSSProperties, ReactNode } from 'react';

import { rwdFontSize } from '@/utils/css';

export const gridCss = css`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  align-items: center;
  row-gap: 10px;
  ${rwdFontSize(16)};
`;

export const Label = styled.div`
  grid-column: 1 / 2;
  font-weight: 600;
`;

export const ItemWrapper = styled.div`
  grid-column: 2 / 3;
  &,
  * {
    margin: 0;
  }
`;

export type DataProps = Record<string, ReactNode | string>;

export interface GridProps<T extends DataProps> {
  data: T;
  labelStyles?: { [key in keyof T]?: CSSProperties };
}
