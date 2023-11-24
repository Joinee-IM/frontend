import styled from 'styled-components';

import Google from '@/assets/google.png';
import Person from '@/assets/user.png';
import AuthButton from '@/components/Button/AuthButton';
import SecuritySection from '@/modules/main/pages/SecuritySection';
import BaseInfoSection from '@/modules/main/pages/UserInfo/BaseInfoSection';
import Section from '@/modules/main/pages/UserInfo/components/Section';
import { flexCenter } from '@/utils/css';

const Container = styled.div`
  padding: 60px clamp(30px, 12.7vw, 200px);
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
  justify-content: space-between;
  column-gap: 80px;
  @media (max-width: 600px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: start;
    row-gap: 40px;
  }
`;

const InformationWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const ImageContainer = styled.div`
  width: max(30%, 200px);
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
  return (
    <Container>
      <Title>個人檔案</Title>
      <ContentWrapper>
        <InformationWrapper>
          <BaseInfoSection />
          <SecuritySection />
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
