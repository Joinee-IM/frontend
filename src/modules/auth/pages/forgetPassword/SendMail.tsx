import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import EmailIcon from '@/assets/icons/Email';
import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';
import { useForgetPassword } from '@/modules/auth/service';

const TextBox = styled.div`
  margin-top: 10px;
`;
const Text = styled.div`
  font-size: 10px;
  margin-bottom: 20px;
`;

export default function SendMail() {
  const location = useLocation();
  const { state = { email: '12345' } } = location as { state: { email: string } };

  const { mutate } = useForgetPassword();
  const handleButtonPress = () => {
    if (state.email) mutate({ email: state.email });
  };

  return (
    <Card hasTitle={false} style={{ padding: '50px 50px 30px' }}>
      <EmailIcon fontSize="80px"></EmailIcon>
      <TextBox>
        <Text>已寄發電子郵件給您，請點選信件中的連結重設密碼。</Text>
        <Text>若未收到請確認垃圾郵件區或點擊下方按鈕，系統將重新發送電子郵件。</Text>
      </TextBox>
      <RippleButton
        category="solid"
        palette="main"
        htmlType="submit"
        style={{ width: '100%', marginTop: '15px' }}
        onClick={handleButtonPress}
      >
        重傳驗證碼
      </RippleButton>
    </Card>
  );
}
