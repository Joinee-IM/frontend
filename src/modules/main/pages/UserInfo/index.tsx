import { Modal } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Google from '@/assets/google.png';
import ImageIcon from '@/assets/icons/Image';
import Person from '@/assets/user.png';
import { RippleButton } from '@/components';
import AuthButton from '@/components/Button/AuthButton';
import BaseInfoSection from '@/modules/main/pages/UserInfo/BaseInfoSection';
import Section from '@/modules/main/pages/UserInfo/components/Section';
import Upload from '@/modules/main/pages/UserInfo/components/Upload';
import SecuritySection from '@/modules/main/pages/UserInfo/SecuritySection';
import { useUserInfo } from '@/modules/main/pages/UserInfo/services';
import { flexCenter } from '@/utils/css';
import toGender from '@/utils/function/toGender';

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

const ContentWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px 80px;
  flex-wrap: wrap-reverse;
`;

const InformationWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const ImageContainer = styled.div`
  flex: 0.5;
  flex-direction: column;
  row-gap: 30px;
  ${flexCenter}
`;

const Image = styled.img`
  width: max(25%, 200px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid gray;
  object-fit: cover;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid ${({ theme }) => theme.gray[300]};
`;

export default function UserInfo() {
  const [imageModal, setImageModal] = useState(false);
  const { account_id } = useParams();
  const { data, refetch } = useUserInfo(Number(account_id));

  const handleUploadSuccess = () => {
    void refetch();
    setImageModal(false);
  };

  return (
    <Container>
      <Title>個人檔案</Title>
      {data?.data && (
        <ContentWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            ease: 'linear',
          }}
        >
          <InformationWrapper>
            <BaseInfoSection
              gender={toGender(data.data.gender)}
              nickname={data.data.nickname}
              email={data.data.email}
            />
            <SecuritySection />
            <Section title="第三方">
              <AuthButton style={{ width: '200px' }} image={Google}>
                與 Google 帳號連結
              </AuthButton>
            </Section>
          </InformationWrapper>
          <ImageContainer>
            <Image src={data.data.image_url ?? Person} />
            <RippleButton
              icon={<ImageIcon style={{ fontSize: '1.5em' }} />}
              category="outlined"
              palette="main"
              onClick={() => setImageModal(true)}
            >
              上傳圖片
            </RippleButton>
          </ImageContainer>
        </ContentWrapper>
      )}
      <Modal
        title={<ModalTitle>上傳圖片</ModalTitle>}
        centered
        open={imageModal}
        footer={null}
        onCancel={() => setImageModal(false)}
      >
        <Upload handleUploadSuccess={handleUploadSuccess} />
      </Modal>
    </Container>
  );
}
