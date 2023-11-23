import { CheckCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';
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
    <Card hasTitle={false}>
      <CheckCircleOutlined />
      <div>您已成功驗證您的電子郵件，歡迎加入 Joinee！請按下一步完整設定您的帳號！</div>
      <RippleButton
        type="solid"
        palette="main"
        htmlType="submit"
        style={{ width: '100%' }}
        onClick={() => navigate('/auth/login')}
      >
        下一步
      </RippleButton>
    </Card>
  );
}
