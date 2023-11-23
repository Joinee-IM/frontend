import { EditFilled } from '@ant-design/icons';
import { Form } from 'antd';
import styled from 'styled-components';

import Google from '@/assets/google.png';
import Person from '@/assets/user.png';
import { RippleButton } from '@/components';
import AuthButton from '@/components/Button/AuthButton';
import GridForm from '@/components/GridForm';
import Section from '@/modules/main/pages/UserInfo/components/Section';
import { flexCenter } from '@/utils/css';
const Container = styled.div`
  padding: 60px 200px;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const Title = styled.div`
  font-size: max(20px, 2.29vw);
  font-weight: 600;
  letter-spacing: 1.8px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 80px;
`;

const InformationWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const ImageContainer = styled.div`
  width: 30%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid gray;
  padding: 1;
  background-color: white;
  ${flexCenter}
`;

const Image = styled.img`
  width: 90%;
  height: 90%;
`;

export default function UserInfo() {
  const [form] = Form.useForm();

  const BaseInfoAction = () => (
    <RippleButton type="outlined" palette="main" icon={<EditFilled />}>
      編輯
    </RippleButton>
  );

  return (
    <Container>
      <Title>個人檔案</Title>
      <ContentWrapper>
        <InformationWrapper>
          <Section title="基本資料" TitleAction={BaseInfoAction}>
            <GridForm
              form={form}
              columns={['email', 'nickname', 'gender']}
              data={{
                email: { value: 'b09705004@ntu.edu.tw', label: '電子郵件' },
                nickname: { value: 'yclai', label: '暱稱' },
                gender: { value: '女', label: '性別' },
              }}
            />
          </Section>
          <Section title="安全性">
            <GridForm
              form={form}
              columns={['password']}
              data={{
                password: { value: '********', label: '密碼' },
              }}
            />
          </Section>
          <Section title="第三方">
            <AuthButton style={{ width: '200px' }} image={Google}>
              與 Google 帳號連結
            </AuthButton>
          </Section>
        </InformationWrapper>
        <ImageContainer>
          <Image src={Person} />
        </ImageContainer>
      </ContentWrapper>
    </Container>
  );
}
