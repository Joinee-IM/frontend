import { Card as CardAntd, Form, Input, InputNumber, Modal, Select, Switch } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import type { UploadProps } from '@/components/Upload';
import type { FeeType } from '@/utils/function/map';

import PlusIcon from '@/assets/icons/Plus';
import { ButtonWrapper, RippleButton } from '@/components/Button';
import { Card, Title } from '@/components/Form';
import { GeneralGrid } from '@/components/Grid';
import GridForm from '@/components/Grid/FormGrid';
import Upload, { UploadImageTitle } from '@/components/Upload';
import { useUploadVenue } from '@/modules/lessor/pages/Upload/services';
import { useLessorBrowseStadium } from '@/modules/lessor/services';
import { AlbumWrapper, ImagePreview } from '@/modules/main/pages/Stadium/components/DetailModal';
import { useSports } from '@/services/useFilters';
import { useAddAlbum } from '@/services/useInfo';
import { flexCenter, percentageOfFigma } from '@/utils/css';
import { getBase64 } from '@/utils/function/image';
import { toFeeType } from '@/utils/function/map';

interface CreateVenueFormDataType {
  stadium_id: number;
  name: string;
  floor: string;
  reservation_interval: number;
  is_reservable: boolean;
  is_chargeable: boolean;
  fee_rate: number;
  fee_type: FeeType;
  area: number;
  capacity: number;
  sport_equipments: string;
  facilities: string;
  court_count: number;
  court_type: string;
  sport_id: number;
  address: string;
  district_id: number;
  contact_number: string;
  description: string;
  city_id: number;
}

const Container = styled.div`
  padding: ${percentageOfFigma(100).max} ${percentageOfFigma(380).max};
  width: 100%;
  box-sizing: border-box;
  ${flexCenter}
`;

const DoubleWrapper = styled.div`
  display: flex;
  width: 100%;
  & > * {
    flex: 1;
  }
`;

const FEETYPE: FeeType[] = ['PER_HOUR', 'PER_PERSON', 'PER_PERSON_PER_HOUR'];

export default function CreateStadium() {
  const [imageModal, setImageModal] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { data, mutate: addVenue } = useUploadVenue();
  const { mutate: addAlbum } = useAddAlbum(Number(data?.data?.id), 'VENUE');
  const navigate = useNavigate();
  const [cookies] = useCookies(['id']);
  const { data: sports } = useSports();
  const [searchParams] = useSearchParams();
  const stadium_id = searchParams.get('stadium_id') as unknown as number;
  const { stadiums } = useLessorBrowseStadium({ limit: 30, offset: 0 });

  const handleUpload: UploadProps['uploader'] = async ({ file, onSuccess: uploadSuccess }) => {
    if (file instanceof File) {
      try {
        const url = await getBase64(file);
        uploadSuccess?.(file);
        setImages((prev) => [...prev, file]);
        setPreviews((prev) => [...prev, url]);
        setImageModal(false);
      } catch (e) {
        /* empty */
      }
    }
  };

  const handleAddVenue =
    (next = false) =>
    async () => {
      try {
        await form.validateFields();
        const {
          stadium_id,
          name,
          floor,
          reservation_interval,
          is_reservable,
          is_chargeable,
          fee_rate,
          fee_type,
          area,
          capacity,
          sport_equipments,
          facilities,
          court_count,
          court_type,
          sport_id,
        } = form.getFieldsValue();
        addVenue(
          {
            stadium_id,
            name,
            floor: String(floor),
            reservation_interval: reservation_interval ?? null,
            is_reservable,
            is_chargeable,
            fee_rate: fee_rate ?? null,
            fee_type: fee_type ?? null,
            area,
            capacity,
            sport_equipments,
            facilities,
            court_count,
            court_type,
            sport_id,
            business_hours: [
              {
                weekday: 1,
                start_time: '08:00:00Z',
                end_time: '17:00:00Z',
              },
              {
                weekday: 2,
                start_time: '08:00:00Z',
                end_time: '17:00:00Z',
              },
              {
                weekday: 3,
                start_time: '08:00:00Z',
                end_time: '17:00:00Z',
              },
              {
                weekday: 4,
                start_time: '08:00:00Z',
                end_time: '17:00:00Z',
              },
              {
                weekday: 5,
                start_time: '08:00:00Z',
                end_time: '17:00:00Z',
              },
            ],
          },
          {
            onSuccess(data) {
              if (next)
                navigate(
                  `/manage/${cookies.id}/create/court?stadium_id=${stadium_id}&venue_id=${data.data?.id}`,
                );
              else navigate(`/manage/${cookies.id}`);
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    if (data?.data?.id) {
      for (const file of images) {
        addAlbum({ file });
      }
    }
  }, [addAlbum, data?.data?.id, images]);

  const [form] = useForm<CreateVenueFormDataType>();
  return (
    <Container>
      <Card>
        <Title>新增場地</Title>
        <GridForm
          style={{ padding: `0 ${percentageOfFigma(80).max}`, rowGap: percentageOfFigma(20).max }}
          form={form}
          data={{
            所屬場館: (
              <Form.Item
                name="stadium_id"
                {...(stadium_id && { initialValue: Number(stadium_id) })}
                rules={[{ required: true, message: '' }]}
              >
                <Select
                  style={{ width: '100%' }}
                  options={stadiums?.map((stadium) => ({
                    value: stadium.stadium_id,
                    label: stadium.stadium_name,
                  }))}
                />
              </Form.Item>
            ),
            場地名稱: (
              <Form.Item name="name" rules={[{ required: true, message: '' }]}>
                <Input />
              </Form.Item>
            ),
            樓層: (
              <Form.Item
                name="floor"
                rules={[{ required: true, message: '' }]}
                style={{ width: '100%' }}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            ),
            是否開放預約: (
              <Form.Item name="is_reservable" valuePropName="checked" initialValue={false}>
                <Switch />
              </Form.Item>
            ),
            '': (
              <Form.Item shouldUpdate noStyle>
                {({ getFieldValue }) => {
                  const reservable = getFieldValue('is_reservable') as boolean;
                  return reservable ? (
                    <CardAntd>
                      <GeneralGrid
                        data={{
                          預約開放時間: (
                            <Form.Item
                              name="reservation_interval"
                              rules={[{ required: true, message: '' }]}
                            >
                              <InputNumber addonAfter="日前" style={{ width: '100%' }} min={0} />
                            </Form.Item>
                          ),
                        }}
                      />
                    </CardAntd>
                  ) : null;
                }}
              </Form.Item>
            ),
            是否收費: (
              <Form.Item name="is_chargeable" valuePropName="checked" initialValue={false}>
                <Switch />
              </Form.Item>
            ),
            ' ': (
              <Form.Item shouldUpdate noStyle>
                {({ getFieldValue }) => {
                  const charging = getFieldValue('is_chargeable') as boolean;
                  return charging ? (
                    <CardAntd>
                      <GeneralGrid
                        data={{
                          收費標準: (
                            <DoubleWrapper>
                              <Form.Item name="fee_rate" rules={[{ required: true, message: '' }]}>
                                <InputNumber addonAfter="元" min={0} />
                              </Form.Item>
                              <Form.Item name="fee_type" rules={[{ required: true, message: '' }]}>
                                <Select
                                  style={{ width: '100%' }}
                                  options={FEETYPE.map((feeType) => ({
                                    value: feeType,
                                    label: toFeeType(feeType),
                                  }))}
                                />
                              </Form.Item>
                            </DoubleWrapper>
                          ),
                        }}
                      />
                    </CardAntd>
                  ) : null;
                }}
              </Form.Item>
            ),
            場地面積: (
              <Form.Item name="area" rules={[{ required: true, message: '' }]}>
                <InputNumber addonAfter="坪" min={0} />
              </Form.Item>
            ),
            容納人數: (
              <Form.Item name="capacity" rules={[{ required: true, message: '' }]}>
                <InputNumber addonAfter="人" min={0} />
              </Form.Item>
            ),
            運動器材租借: (
              <Form.Item
                name="sport_equipments"
                initialValue={''}
                rules={[{ required: false, message: '' }]}
              >
                <TextArea rows={4} placeholder="請列出有提供的器材，若無可不填" />
              </Form.Item>
            ),
            '小單位（桌/網）': (
              <DoubleWrapper style={{ width: '60%' }}>
                <Form.Item name="court_count" rules={[{ required: true, message: '' }]}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="court_type" rules={[{ required: true, message: '' }]}>
                  <Select
                    style={{ width: '100%' }}
                    options={['桌', '網'].map((court_type) => ({
                      value: court_type,
                      label: court_type,
                    }))}
                  />
                </Form.Item>
              </DoubleWrapper>
            ),
            設備: (
              <Form.Item
                name="facilities"
                initialValue={''}
                rules={[{ required: false, message: '' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="請列出提供的設備，如：淋浴間、吹風機等，若無可不填"
                />
              </Form.Item>
            ),
            運動項目: (
              <Form.Item
                name="sport_id"
                initialValue={''}
                rules={[{ required: true, message: '' }]}
              >
                <Select
                  style={{ width: '100%' }}
                  options={sports?.data?.map((sport) => ({
                    value: sport.id,
                    label: sport.name,
                  }))}
                />
              </Form.Item>
            ),
            場地相片: (
              <>
                <RippleButton
                  icon={<PlusIcon />}
                  category="outlined"
                  palette="main"
                  onClick={() => setImageModal(true)}
                >
                  新增圖片
                </RippleButton>
                <Modal
                  title={<UploadImageTitle />}
                  centered
                  open={imageModal}
                  footer={null}
                  onCancel={() => setImageModal(false)}
                >
                  <Upload
                    uploader={handleUpload}
                    uploadConfig={{
                      multiple: true,
                    }}
                    successMessage="once"
                  />
                </Modal>
              </>
            ),
            '  ': (
              <AlbumWrapper>
                {previews.map((preview, index) => (
                  <ImagePreview
                    key={index}
                    src={preview}
                    placeholder={<ImagePreview preview={false} />}
                  />
                ))}
              </AlbumWrapper>
            ),
          }}
        />
        <ButtonWrapper>
          <RippleButton category="solid" palette="main" onClick={handleAddVenue()}>
            下一步
          </RippleButton>
        </ButtonWrapper>
      </Card>
    </Container>
  );
}
