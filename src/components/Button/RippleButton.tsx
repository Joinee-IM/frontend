import { Button } from 'antd';
import styled from 'styled-components';

import type { ButtonProps } from 'antd';
import type { ReactNode } from 'react';

interface TapButtonProps extends ButtonProps {
  children?: ReactNode;
}

const RippleButtonBase = styled(Button)`
  padding: 0.8% 3%;
  font-weight: bolder;
  font-size: 1.5vw;
  border-radius: 10px;
  width: fit-content;
  white-space: nowrap;
  box-sizing: content-box;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.main[500]};

  &:hover {
    background-color: ${(props) => props.theme.main[300]} !important;
  }
  &:active {
    background-color: ${(props) => props.theme.main[700]} !important;
  }
`;

export default function RippleButton({ children, ...rest }: TapButtonProps) {
  return (
    <RippleButtonBase type="primary" {...rest}>
      {children}
    </RippleButtonBase>
  );
}
