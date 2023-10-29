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
  background-color: #5988a1;
  &:hover {
    background-color: #85bad0 !important;
  }
  &:active {
    background-color: #284b63 !important;
  }
`;

export default function RippleButton({ children, ...rest }: TapButtonProps) {
  return (
    <RippleButtonBase type="primary" {...rest}>
      {children}
    </RippleButtonBase>
  );
}
