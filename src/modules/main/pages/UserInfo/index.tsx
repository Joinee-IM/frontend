import { Modal } from 'antd';
import { motion, useAnimationControls } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Google from '@/assets/google.png';
import ImageIcon from '@/assets/icons/Image';
import Person from '@/assets/user.png';
import { RippleButton } from '@/components';
import AuthButton from '@/components/Button/AuthButton';
import { useGoogleLogin } from '@/modules/auth/service';
import { Container } from '@/modules/main/components';
import BaseInfoSection from '@/modules/main/pages/UserInfo/BaseInfoSection';
import Section from '@/modules/main/pages/UserInfo/components/Section';
import Upload from '@/modules/main/pages/UserInfo/components/Upload';
import SecuritySection from '@/modules/main/pages/UserInfo/SecuritySection';
import { useUserInfo } from '@/modules/main/pages/UserInfo/services';
import { flexCenter } from '@/utils/css';

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

const Image = styled(motion.img).withConfig({
  shouldForwardProp: (prop) => !['change'].includes(prop),
})<{ change?: boolean }>`
  width: max(25%, 200px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.main[500]};
  object-fit: cover;
  transform: ${({ change }) => (change ? 'scale(1.2)' : 'scale(1)')};
  transition: all 0.1s ease-in-out;
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
  const controls = useAnimationControls();
  const { googleLogin } = useGoogleLogin();

  const handleUploadSuccess = async () => {
    setImageModal(false);
    await refetch();
    await controls.start({ opacity: 1, scale: [2, 1] });
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
              gender={data.data.gender}
              nickname={data.data.nickname}
              email={data.data.email}
            />
            <SecuritySection />
            <Section title="第三方">
              <AuthButton style={{ width: '200px' }} image={Google} onClick={() => googleLogin()}>
                與 Google 帳號連結
              </AuthButton>
            </Section>
          </InformationWrapper>
          <ImageContainer>
            <Image
              src={data.data.image_url ?? Person}
              initial={{ opacity: 1, scale: 1 }}
              animate={controls}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: 'spring',
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001,
                },
              }}
            />
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
