import { Button } from 'antd';
import styled from 'styled-components';

import type { ButtonProps } from 'antd';
import type { ReactNode } from 'react';

import getTheme, { ButtonThemeProps } from '@/components/Button/theme';
import { flexCenter } from '@/utils/css';

type TapButtonProps = ButtonThemeProps &
  Omit<ButtonProps, 'type' | 'theme'> & { children?: ReactNode };

const RippleButtonBase = styled(Button)<ButtonThemeProps>`
  padding: 0.8% 3%;
  font-weight: bolder;
  font-size: max(1vw, 12px);
  border-radius: 10px;
  width: fit-content;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  ${flexCenter};
  ${({ type, palette }) => getTheme({ type, palette })}
`;

export default function RippleButton({ children, ...rest }: TapButtonProps) {
  return <RippleButtonBase {...rest}>{children}</RippleButtonBase>;
}
