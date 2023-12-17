import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CheckIcon from '@/assets/icons/Check';
import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';
import { ContentWrapper, Text, TextWrapper } from '@/modules/auth/components/InfoNotation';
import { useEmailVerification } from '@/modules/auth/service';

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
      <ContentWrapper style={{ height: '250px', width: 'max-content' }}>
        <CheckIcon fontSize="80px"></CheckIcon>
        <TextWrapper style={{ alignItems: 'center', rowGap: 0, marginBottom: '20px' }}>
          <Text>您已成功驗證您的電子郵件，歡迎加入 Jöinee！</Text>
          <Text>立即登入享受您的運動之旅！</Text>
        </TextWrapper>
        <RippleButton
          category="solid"
          palette="main"
          htmlType="submit"
          style={{ width: '100%' }}
          onClick={() => navigate('/auth/login')}
        >
          立即登入
        </RippleButton>
      </ContentWrapper>
    </Card>
  );
}
