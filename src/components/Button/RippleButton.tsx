import { Button } from 'antd';
import styled from 'styled-components';

import type { ButtonProps } from 'antd';
import type { ReactNode } from 'react';

import { flexCenter } from '@/utils/css';

interface TapButtonProps extends ButtonProps {
  children?: ReactNode;
}

const RippleButtonBase = styled(Button)`
  padding: 0.8% 3%;
  font-weight: bolder;
  font-size: max(1vw, 12px);
  border-radius: 10px;
  width: fit-content;
  white-space: nowrap;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.main[500]};
  ${flexCenter}

  &:not([disabled]) {
    &:hover {
      background-color: ${(props) => props.theme.main[300]} !important;
    }
    &:active {
      background-color: ${(props) => props.theme.main[700]} !important;
    }
  }
`;

export default function RippleButton({ children, ...rest }: TapButtonProps) {
  return (
    <RippleButtonBase type="primary" {...rest}>
      {children}
    </RippleButtonBase>
  );
}
