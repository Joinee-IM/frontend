import { message, Modal, Upload, UploadProps } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Google from '@/assets/google.png';
import ImageIcon from '@/assets/icons/Image';
import UploadIcon from '@/assets/icons/Upload';
import Person from '@/assets/user.png';
import { RippleButton } from '@/components';
import AuthButton from '@/components/Button/AuthButton';
import Divider from '@/components/Divider';
import BaseInfoSection from '@/modules/main/pages/UserInfo/BaseInfoSection';
import Section from '@/modules/main/pages/UserInfo/components/Section';
import SecuritySection from '@/modules/main/pages/UserInfo/SecuritySection';
import { useEditAvatar, useUserInfo } from '@/modules/main/pages/UserInfo/services';
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
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid ${({ theme }) => theme.gray[300]};
`;

const UploadContainer = styled.div`
  color: ${({ theme }) => theme.main[500]};
  height: 400px;
  box-sizing: border-box;
  padding: 0 10%;
  ${flexCenter}
  flex-direction: column;
`;

export default function UserInfo() {
  const [imageModal, setImageModal] = useState(false);
  const { account_id } = useParams();
  const { data } = useUserInfo(Number(account_id));
  const { mutate, isLoading } = useEditAvatar(Number(account_id));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  const props: UploadProps = useMemo(
    () => ({
      name: '123x',
      maxCount: 1,
      accept: '.jpg,.jpeg,.png',
      onChange: (info) => {
        if (info.file.status === 'done') {
          void message.success(`${info.file.name} 上傳成功！！`);
        } else if (info.file.status === 'error') {
          void message.error(`${info.file.name} 上傳失敗 😖`);
        }
      },
      customRequest: ({
        file,
        onError: uploadError,
        onProgress: uploadProgress,
        onSuccess: uploadSuccess,
      }) => {
        if (isLoading) {
          console.log('Hiii');
          let width = 0;
          const clear = setInterval(() => {
            if (width >= 99) {
              clearInterval(clear);
            } else width += 10;
          }, 10);
          uploadProgress?.({ percent: progress });
        }
        if (file instanceof File) {
          uploadProgress?.({ percent: 50 });
          mutate(
            { image: file },
            {
              onSuccess: () => {
                uploadSuccess?.(file);
                setImageModal(false);
              },
              onError: uploadError,
            },
          );
        }
      },
    }),
    [isLoading, mutate, progress],
  );

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
            <Image src={Person} />
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
        <UploadContainer>
          <UploadIcon style={{ fontSize: 'clamp(100px, 25vw, 200px)' }} />
          將檔案拖曳至此
          <Divider text="或是"></Divider>
          <Upload
            {...props}
            onChange={() => {
              const clear = setInterval(
                () =>
                  setProgress((prev) => {
                    if (prev >= 99) {
                      clearInterval(clear);
                    }
                    return prev + 10;
                  }),
                5000,
              );
            }}
          >
            <RippleButton
              category="solid"
              palette="main"
              onClick={() => {
                const clear = setInterval(
                  () =>
                    setProgress((prev) => {
                      if (prev >= 99) {
                        clearInterval(clear);
                      }
                      return prev + 10;
                    }),
                  10,
                );
              }}
            >
              從電腦上傳檔案
            </RippleButton>
          </Upload>
        </UploadContainer>
      </Modal>
    </Container>
  );
}
