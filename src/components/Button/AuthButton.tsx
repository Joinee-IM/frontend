import { Button } from 'antd';
import styled from 'styled-components';

import { flexCenter } from '@/utils/css';

interface AuthButtonProps extends React.ComponentProps<typeof AuthButtonBase> {
  image?: string;
}

const AuthButtonBase = styled(Button)`
  display: flex;
  padding: 12px 33px;
  box-sizing: border-box;
  gap: 16px;
  border-radius: 8px;
  border: 1px solid #808080;
  background: #fff;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  ${flexCenter}
`;

const ImageContainer = styled.div`
  width: 20px;
  ${flexCenter}
`;

export default function AuthButton({ children, image, ...rest }: AuthButtonProps) {
  return (
    <AuthButtonBase {...rest}>
      {image && (
        <ImageContainer>
          <img src={image} style={{ width: '100%' }} />
        </ImageContainer>
      )}
      {children}
    </AuthButtonBase>
  );
}
