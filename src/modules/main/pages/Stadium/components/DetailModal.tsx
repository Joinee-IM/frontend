import { Image, Modal } from 'antd';
import { Fragment, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { Type } from '@/utils/type';

import { RippleButton } from '@/components';
import GridForm from '@/components/Grid/FormGrid';
import { RoundTag, RoundTagWrapper } from '@/components/Tag';
import { useStadiumInfo } from '@/modules/main/pages/Stadium/services';
import { useAlbum } from '@/services/useInfo';
import { BusinessHours } from '@/utils/function/time';

interface DetailModalProps extends Type<typeof Modal> {
  stadiumId: number;
}

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const AlbumWrapper = styled.div`
  width: 100%;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  /* grid-auto-rows: 0px; */
  min-height: 0;
  overflow: scroll;
`;

export const ImagePreview = styled(Image)`
  aspect-ratio: 1;
  object-fit: cover;
  min-height: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  align-items: center;
  row-gap: 10px;
`;

const Label = styled.div`
  grid-column: 1 / 2;
  align-self: baseline;
  padding-right: 1em;
`;

const Time = styled.div`
  grid-column: 2 / 3;
`;

export default function DetailModal({ open, onCancel, stadiumId }: DetailModalProps) {
  const { data: info, isFetching } = useStadiumInfo(stadiumId);
  const { data: album } = useAlbum(stadiumId, 'STADIUM');
  const navigate = useNavigate();
  const [cookies] = useCookies(['id', 'user-role']);

  const Footer = useMemo(
    () =>
      cookies['user-role'] === 'PROVIDER' ? (
        <></>
      ) : (
        <ButtonWrapper>
          <RippleButton category="outlined" palette="gray" onClick={onCancel}>
            關閉
          </RippleButton>
          <RippleButton
            category="solid"
            palette="main"
            onClick={() => navigate(`/stadium/${stadiumId}/venue`)}
          >
            前往選擇場地
          </RippleButton>
        </ButtonWrapper>
      ),
    [cookies, navigate, onCancel, stadiumId],
  );

  if (isFetching) return <></>;
  const businessHours = new BusinessHours(info?.data?.business_hours).latestAvailableTime;

  return (
    <Modal
      title={<ModalTitle>{info?.data?.name}</ModalTitle>}
      centered
      open={open}
      footer={Footer}
      onCancel={onCancel}
      closable={false}
      style={{ overflow: 'scroll', maxHeight: '90vh' }}
    >
      <GridForm
        data={{
          地址: info?.data?.address,
          營業時間:
            typeof businessHours === 'string' ? (
              businessHours
            ) : (
              <TimeGrid>
                {Object.entries(businessHours).map(([week, time], index) => (
                  <Fragment key={index}>
                    <Label>{week}</Label>
                    <Time>{time}</Time>
                  </Fragment>
                ))}
              </TimeGrid>
            ),
          提供的運動項目: (
            <RoundTagWrapper>
              {info?.data?.sports?.map((tag, index) => <RoundTag key={index}>{tag}</RoundTag>)}
            </RoundTagWrapper>
          ),
          連絡電話: info?.data?.contact_number,
          簡介: info?.data?.description,
          相簿: '',
        }}
        labelStyles={{ 營業時間: { alignSelf: 'baseline' }, 簡介: { alignSelf: 'baseline' } }}
        style={{ padding: '20px 0px' }}
      />
      <AlbumWrapper>
        {album?.data?.map(({ url }, index) => (
          <ImagePreview key={index} src={url} placeholder={<ImagePreview preview={false} />} />
        ))}
      </AlbumWrapper>
    </Modal>
  );
}
