import { Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import CalendarIcon from '@/assets/icons/Calendar';
import HelpIcon from '@/assets/icons/Help';
import PlusIcon from '@/assets/icons/Plus';
import { ButtonWrapper, RippleButton } from '@/components/Button';
import { Card, Title } from '@/components/Form';
import GridForm from '@/components/Grid/FormGrid';
import { useLoading } from '@/components/Loading/PageLoading';
import PopOver from '@/components/Popover';
import Upload, { UploadImageTitle, type UploadProps } from '@/components/Upload';
import useFilter from '@/hooks/useFilter';
import { useUploadStadium } from '@/modules/lessor/pages/Upload/services';
import { AlbumWrapper, ImagePreview } from '@/modules/main/pages/Stadium/components/DetailModal';
import theme from '@/provider/theme/theme';
import { useCity, useDistrict } from '@/services/useFilters';
import { useAddAlbum } from '@/services/useInfo';
import { flexCenter, percentageOfFigma } from '@/utils/css';
import { getBase64 } from '@/utils/function/image';

interface CreateStadiumFormDataType {
  name: string;
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

const AddressWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default function CreateStadium() {
  const { city, setCity } = useFilter();
  const { data: cities, isLoading: loadingCity } = useCity();
  const { data: districts, isLoading: loadingDistrict } = useDistrict(city ?? 0);
  const [imageModal, setImageModal] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { data, mutate: addStadium } = useUploadStadium();
  const { mutate: addAlbum } = useAddAlbum(Number(data?.data?.id), 'STADIUM');

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

  const handleAddStadium = async () => {
    try {
      await form.validateFields();
      const { name, address, district_id, contact_number, description, city_id } =
        form.getFieldsValue();
      addStadium({
        name,
        district_id,
        contact_number,
        description,
        address: `${cities?.data?.find((data) => data.id === city_id)?.name}${districts?.data?.find(
          (data) => data.id === district_id,
        )?.name}${address}`,
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
      });
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

  const { context } = useLoading([loadingCity]);

  const [form] = useForm<CreateStadiumFormDataType>();
  return (
    <>
      {context}
      <Container>
        <Card>
          <Title>新增場館</Title>
          <GridForm
            style={{ padding: `0 ${percentageOfFigma(80).max}`, rowGap: percentageOfFigma(20).max }}
            form={form}
            labelStyles={{
              場館介紹: { alignSelf: 'flex-start' },
            }}
            data={{
              場館名稱: (
                <Form.Item name="name" rules={[{ required: true, message: '' }]}>
                  <Input />
                </Form.Item>
              ),
              地址: (
                <AddressWrapper>
                  <Form.Item
                    name="city_id"
                    style={{ flex: 0.5 }}
                    rules={[{ required: true, message: '' }]}
                  >
                    <Select
                      options={cities?.data?.map((city) => ({
                        label: city.name,
                        value: city.id,
                      }))}
                      onSelect={(city_id) => setCity(Number(city_id))}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ flex: 0.5 }}
                    name="district_id"
                    rules={[{ required: true, message: '' }]}
                  >
                    <Select
                      style={{ width: '100%' }}
                      options={districts?.data?.map((district) => ({
                        label: district.name,
                        value: district.id,
                      }))}
                      disabled={loadingDistrict || !city}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ flex: 1 }}
                    name="address"
                    rules={[{ required: true, message: '' }]}
                  >
                    <Input />
                  </Form.Item>
                </AddressWrapper>
              ),
              營業時間: (
                <TimeWrapper>
                  {'週一到週日 08:00 - 22:00'}
                  <RippleButton category="icon" palette="gray">
                    <CalendarIcon fontSize="0.5em" />
                  </RippleButton>
                </TimeWrapper>
              ),
              聯絡電話: (
                <Form.Item name="contact_number" rules={[{ required: true, message: '' }]}>
                  <Input placeholder="02-33665959" />
                </Form.Item>
              ),
              場館介紹: (
                <Form.Item name="description" initialValue={''}>
                  <TextArea rows={4} />
                </Form.Item>
              ),
              場館相片: (
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
              '': (
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
            <PopOver
              placement="topRight"
              icon={<HelpIcon fontSize="2em" color={theme.main[700]} />}
              content={
                <div style={{ width: '400px' }}>
                  您的場館目前沒有場地可供使用者使用/預約，請按繼續上架接著上架場地。
                </div>
              }
              footer={
                <>
                  <RippleButton category="outlined" palette="main" onClick={handleAddStadium}>
                    上架場館
                  </RippleButton>
                  <RippleButton category="solid" palette="main">
                    繼續上架
                  </RippleButton>
                </>
              }
              trigger="click"
            >
              <RippleButton category="solid" palette="main">
                下一步
              </RippleButton>
            </PopOver>
          </ButtonWrapper>
        </Card>
      </Container>
    </>
  );
}
