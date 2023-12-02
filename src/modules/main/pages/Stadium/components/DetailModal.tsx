import { Image, Modal } from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { Type } from '@/utils/type';

import { RippleButton } from '@/components';
import GridForm from '@/components/GridForm';
import { Tag, TagWrapper } from '@/modules/main/pages/Stadium/components/ListItem';

type DetailModalProps = Type<typeof Modal>;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid ${({ theme }) => theme.gray[300]};
`;

export const AlbumWrapper = styled.div`
  width: 100%;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  grid-auto-rows: 0px;
  overflow: scroll;
`;

export const ImagePreview = styled(Image)`
  aspect-ratio: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
`;

export default function DetailModal({ open, onCancel }: DetailModalProps) {
  const navigate = useNavigate();
  const Footer = useMemo(
    () => (
      <ButtonWrapper>
        <RippleButton category="outlined" palette="gray">
          關閉
        </RippleButton>
        <RippleButton category="solid" palette="main" onClick={() => navigate('/stadium/1/venue')}>
          前往選擇場地
        </RippleButton>
      </ButtonWrapper>
    ),
    [navigate],
  );

  return (
    <Modal
      title={<ModalTitle>臺大體育館</ModalTitle>}
      centered
      open={open}
      footer={Footer}
      onCancel={onCancel}
      style={{ overflow: 'scroll', maxHeight: '90vh' }}
    >
      <GridForm
        data={{
          地址: '臺北市大安區羅斯福路四段 1 號',
          營業時間: '週一至週日 08:00-18:00',
          提供的運動項目: (
            <TagWrapper>
              <Tag>羽球</Tag>
              <Tag>桌球</Tag>
            </TagWrapper>
          ),
          連絡電話: '02-27618235',
          簡介: '你好，這是臺大體育館，歡迎你來這邊運動，我們這邊應有盡有，快來這邊大顯身手，羽球與桌球健將們。',
          相簿: '',
        }}
        labelStyles={{ 簡介: { alignSelf: 'baseline' } }}
        style={{ padding: '5px 0px 10px' }}
      />
      <AlbumWrapper>
        <ImagePreview
          src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
          placeholder={
            <ImagePreview
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            />
          }
        />
        <ImagePreview
          src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
          placeholder={
            <ImagePreview
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            />
          }
        />
      </AlbumWrapper>
    </Modal>
  );
}
