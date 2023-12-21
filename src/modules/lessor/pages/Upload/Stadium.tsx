import { Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { eachDayOfInterval, endOfWeek, format, setHours, startOfWeek } from 'date-fns';
import { isNil, range } from 'lodash';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CalendarIcon from '@/assets/icons/Calendar';
import HelpIcon from '@/assets/icons/Help';
import PlusIcon from '@/assets/icons/Plus';
import { ButtonWrapper, RippleButton } from '@/components/Button';
import { Card, Title } from '@/components/Form';
import GridForm from '@/components/Grid/FormGrid';
import { useLoading } from '@/components/Loading/PageLoading';
import PopOver from '@/components/Popover';
import TimeSlot from '@/components/TimeSlot';
import useTimeSlotDrag from '@/components/TimeSlot/useTimeSlotDrag';
import Upload, { UploadImageTitle, type UploadProps } from '@/components/Upload';
import useError from '@/hooks/useError';
import useFilter from '@/hooks/useFilter';
import { useUploadStadium } from '@/modules/lessor/pages/Upload/services';
import { AlbumWrapper, ImagePreview } from '@/modules/main/pages/Stadium/components/DetailModal';
import theme from '@/provider/theme/theme';
import { useCity, useDistrict } from '@/services/useFilters';
import { useAddAlbum } from '@/services/useInfo';
import { flexCenter, percentageOfFigma } from '@/utils/css';
import { getBase64 } from '@/utils/function/image';
import { BusinessHours, type TimeOmit } from '@/utils/function/time';

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  const { data, mutate: addStadium, error } = useUploadStadium();
  const { mutate: addAlbum } = useAddAlbum(Number(data?.data?.id), 'STADIUM');
  const navigate = useNavigate();
  const [cookies] = useCookies(['id']);
  const [timeSlotOpen, setTimeSlotOpen] = useState(false);
  const [businessHour, setBusinessHour] = useState<TimeOmit[]>([]);

  const timeRange = useMemo(() => range(0, 24), []);
  const dates = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(new Date()),
        end: endOfWeek(new Date()),
      }),
    [],
  );
  const init = useMemo<(boolean | null)[][]>(() => {
    return dates.map(() => timeRange?.slice(1).map(() => false) ?? []);
  }, [dates, timeRange]);

  const { cells, setCells, handleUnitMouseDown, handleUnitMouseEnter } = useTimeSlotDrag(
    init,
    'diagonal',
  );

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

  const handleAddStadium =
    (next = false) =>
    async () => {
      try {
        await form.validateFields();
        const { name, address, district_id, contact_number, description, city_id } =
          form.getFieldsValue();
        addStadium(
          {
            name,
            district_id,
            contact_number,
            description,
            address: `${cities?.data?.find((data) => data.id === city_id)
              ?.name}${districts?.data?.find((data) => data.id === district_id)?.name}${address}`,
            business_hours: businessHour,
          },
          {
            onSuccess(data) {
              if (next) navigate(`/manage/${cookies.id}/create/venue?stadium_id=${data?.data?.id}`);
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

  const handleBusinessHourOk = () => {
    const time = cells.reduce(
      (acc, curr, weekday) => ({
        ...acc,
        [weekday === 0 ? 7 : weekday]: curr
          .map((time, index, array) => {
            if (index === 0 && time) return array[1] ? index : [index, index];
            if (index === array.length - 1 && time)
              return array[array.length - 2] ? index : [index, index];
            if (time && (!array[index - 1] || !array[index + 1]))
              return !array[index - 1] && !array[index + 1] ? [index, index] : index;
          })
          .flat()
          .filter((time) => !isNil(time))
          .reduce<{ weekday: number; start_time?: string; end_time?: string }[]>(
            (acc, curr, index) => {
              if ((index + 1) % 2 === 1) {
                return [
                  ...acc,
                  {
                    weekday: weekday === 0 ? 7 : weekday,
                    start_time: format(setHours(new Date('2023-12-21'), Number(curr)), 'HH:mm:ss'),
                  },
                ];
              } else {
                return [
                  ...acc.slice(0, acc.length - 1),
                  {
                    ...acc[acc.length - 1],
                    end_time:
                      curr === 0
                        ? '23:59:59Z'
                        : format(setHours(new Date('2023-12-21'), Number(curr) + 1), 'HH:mm:ss'),
                  },
                ];
              }
            },
            [],
          ),
      }),
      {},
    );
    setBusinessHour(Object.values(time).flat() as TimeOmit[]);
    setTimeSlotOpen(false);
  };

  const { context } = useLoading([loadingCity]);
  const { context: errorContext } = useError(error, { NotFound: '請輸入正確地址' });

  const [form] = useForm<CreateStadiumFormDataType>();
  return (
    <>
      {errorContext}
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
                  {!!businessHour.length && (
                    <TimeGrid>
                      {Object.entries(new BusinessHours(businessHour).latestAvailableTime).map(
                        ([week, time], index) => (
                          <Fragment key={index}>
                            <Label>{week}</Label>
                            <Time>{time}</Time>
                          </Fragment>
                        ),
                      )}
                    </TimeGrid>
                  )}
                  <RippleButton
                    category="icon"
                    palette="gray"
                    onClick={() => setTimeSlotOpen(true)}
                  >
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
                  這個場館有場地需要上架嗎？請按繼續新增以新增場地。
                </div>
              }
              footer={
                <>
                  <RippleButton category="outlined" palette="main" onClick={handleAddStadium(true)}>
                    繼續新增
                  </RippleButton>
                  <RippleButton category="solid" palette="main" onClick={handleAddStadium()}>
                    上架場館
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
        <Modal
          centered
          open={timeSlotOpen}
          footer={
            <ButtonWrapper>
              <RippleButton
                category="outlined"
                palette="gray"
                onClick={() => {
                  setCells(init);
                  setTimeSlotOpen(false);
                }}
              >
                取消
              </RippleButton>
              <RippleButton category="solid" palette="main" onClick={handleBusinessHourOk}>
                確認
              </RippleButton>
            </ButtonWrapper>
          }
          onCancel={() => setTimeSlotOpen(false)}
          width={900}
          closable={false}
          style={{ maxHeight: '80vh', overflow: 'scroll' }}
        >
          <TimeSlot
            {...{
              cells,
              handleUnitMouseDown,
              handleUnitMouseEnter,
              date: dates,
              timeRange,
            }}
            weekOnly={true}
            style={{ padding: `0 ${percentageOfFigma(70).max} ${percentageOfFigma(40).max}` }}
          />
        </Modal>
      </Container>
    </>
  );
}
