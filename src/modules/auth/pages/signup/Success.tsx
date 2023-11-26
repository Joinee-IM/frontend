import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import CheckIcon from '@/assets/icons/Check';
import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';
import { useEmailVerification } from '@/modules/auth/service';

const TextBox = styled.div`
  margin-top: 20px;
`;
const Text = styled.div`
  font-size: 10px;
  margin-bottom: 15px;
`;
export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const { mutate } = useEmailVerification();
  useEffect(() => {
    if (code) mutate({ code });
  }, [code, mutate]);
  return (
    <Card hasTitle={false} style={{ padding: '50px 50px 30px' }}>
      <CheckIcon fontSize="80px"></CheckIcon>
      <TextBox>
        <Text>您已成功驗證您的電子郵件，歡迎加入 Joinee！</Text>
        <Text>立即登入享受您的運動之旅！</Text>
      </TextBox>
      <RippleButton
        type="solid"
        palette="main"
        htmlType="submit"
        style={{ width: '100%' }}
        onClick={() => navigate('/auth/login')}
      >
        立即登入
      </RippleButton>
    </Card>
  );
}
