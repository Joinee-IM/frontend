import { Button } from 'antd';
import styled from 'styled-components';

import type { ButtonProps } from 'antd';
import type { ReactNode } from 'react';

import getTheme, { ButtonThemeProps, ButtonType } from '@/components/Button/theme';
import { MOBILE_WITH } from '@/constants/rwd';
import { flexCenter, percentageOfFigma } from '@/utils/css';

interface RippleButtonProps<T extends ButtonType> extends ButtonThemeProps<T>, ButtonProps {
  borderBox?: boolean;
  children?: ReactNode;
}

function ThemeButton<T extends ButtonType>(props: RippleButtonProps<T>) {
  return <Button {...props} />;
}

const RippleButtonBase = styled(ThemeButton).withConfig({
  shouldForwardProp: (prop) => !['borderBox'].includes(prop),
})<{ borderBox?: boolean }>`
  font-size: ${percentageOfFigma(16).max};
  padding: max(${percentageOfFigma(5).vw}, ${percentageOfFigma(5).vh})
    max(${percentageOfFigma(10).vw}, ${percentageOfFigma(10).vh});
  @media (max-width: ${MOBILE_WITH}px) {
    font-size: min(12px, ${percentageOfFigma(16).max});
  }
  border-radius: 0.5em;
  width: fit-content;
  height: fit-content;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  box-sizing: ${({ borderBox }) => (borderBox ? 'border-box' : 'content-box')};
  ${flexCenter};
  ${({ category, palette }) => getTheme({ category, palette })}
`;

export default function RippleButton<T extends ButtonType>({
  children,
  ...rest
}: RippleButtonProps<T>) {
  return <RippleButtonBase {...rest}>{children}</RippleButtonBase>;
}
