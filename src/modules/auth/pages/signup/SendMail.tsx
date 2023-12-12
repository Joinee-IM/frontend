import { useLocation } from 'react-router-dom';

import EmailIcon from '@/assets/icons/Email';
import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';
import { ContentWrapper, Text, TextWrapper } from '@/modules/auth/components/InfoNotation';
import { useResendEmailVerification } from '@/modules/auth/service';

export default function SendMail() {
  const location = useLocation();
  const { state = { email: '12345' } } = location as { state: { email: string } };

  const { mutate, isLoading } = useResendEmailVerification();
  const handleButtonPress = () => {
    if (state.email) mutate({ email: state.email });
  };

  return (
    <Card hasTitle={false} style={{ padding: '50px 50px 30px' }}>
      <ContentWrapper>
        <EmailIcon fontSize="100px"></EmailIcon>
        <TextWrapper>
          <Text>已寄發電子郵件認證信給您</Text>
          <Text>
            請點選信件中的連結進行驗證。若未收到驗證信請確認垃圾郵件區或點擊下方按鈕，系統將重新發送驗證信。
          </Text>
        </TextWrapper>

        <RippleButton
          category="solid"
          palette="main"
          htmlType="submit"
          style={{ width: '100%', marginTop: '15px' }}
          onClick={handleButtonPress}
          loading={isLoading}
        >
          重傳驗證碼
        </RippleButton>
      </ContentWrapper>
    </Card>
  );
}
