import { Button } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';

import type { ButtonProps } from 'antd';

import getTheme, { ButtonThemeProps, ButtonType } from '@/components/Button/theme';
import { flexCenter } from '@/utils/css';

interface RippleButtonProps<T extends ButtonType> extends ButtonThemeProps<T>, ButtonProps {
  borderBox?: boolean;
  children?: ReactNode;
}

function ThemeButton<T extends ButtonType>(props: RippleButtonProps<T>) {
  return <Button {...props} />;
}

const RippleButtonBase = styled(ThemeButton)<{ borderBox?: boolean }>`
  padding: 0.44vw 1vw;
  font-weight: bolder;
  font-size: clamp(12px, 1vw, 16px);
  border-radius: 10px;
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
