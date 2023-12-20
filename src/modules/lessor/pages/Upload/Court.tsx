import { Form, InputNumber, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonWrapper, RippleButton } from '@/components/Button';
import { Card, Title } from '@/components/Form';
import GridForm from '@/components/Grid/FormGrid';
import { useUploadCourt } from '@/modules/lessor/pages/Upload/services';
import { useLessorBrowseStadium } from '@/modules/lessor/services';
import { useBrowseVenue, useVenueInfo } from '@/modules/main/pages/Venue/services';
import { flexCenter, percentageOfFigma } from '@/utils/css';

interface CreateCourtFormDataType {
  venue_id: number;
  add: number;
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

export default function CreateCourt() {
  const { mutate: addCourt, isLoading } = useUploadCourt();
  const navigate = useNavigate();
  const [cookies] = useCookies(['id']);
  const [searchParams] = useSearchParams();
  const stadium_id = searchParams.get('stadium_id') as unknown as number;
  const venue_id = searchParams.get('venue_id') as unknown as number;

  const [stadiumId, setStadiumId] = useState(Number(stadium_id));
  const [venueId, setVenueId] = useState(Number(venue_id));
  const limit = useMemo(() => 10, []);

  const { stadiums } = useLessorBrowseStadium({ limit, offset: 0 });
  const { venues } = useBrowseVenue({
    limit: 20,
    offset: 0,
    stadium_id: stadiumId,
  });
  const { data: venue } = useVenueInfo(venueId);

  const handleAddCourt = async () => {
    try {
      await form.validateFields();
      const { add } = form.getFieldsValue();
      addCourt({ venue_id: venueId, add }, { onSuccess: () => navigate(`/manage/${cookies.id}`) });
    } catch (error) {
      console.log(error);
    }
  };

  const [form] = useForm<CreateCourtFormDataType>();
  return (
    <Container>
      <Card>
        <Title>新增小單位</Title>
        <GridForm
          style={{ padding: `0 ${percentageOfFigma(80).max}`, rowGap: percentageOfFigma(20).max }}
          form={form}
          data={{
            所屬場館: (
              <Form.Item
                name="stadium_id"
                {...(stadium_id && { initialValue: Number(stadium_id) })}
              >
                <Select
                  style={{ width: '100%' }}
                  options={stadiums?.map((stadium) => ({
                    value: stadium.stadium_id,
                    label: stadium.stadium_name,
                  }))}
                  onSelect={(key) => {
                    setStadiumId(Number(key));
                    setVenueId(Number(undefined));
                  }}
                />
              </Form.Item>
            ),
            所屬場地: (
              <Select
                style={{ width: '100%' }}
                options={venues?.map((venue) => ({
                  value: venue.id,
                  label: venue.name,
                }))}
                {...(venueId && { value: venueId })}
                onSelect={(key) => setVenueId(Number(key))}
              />
            ),
            ...(venueId && {
              現有小單位: (
                <DoubleWrapper style={{ width: '60%' }}>
                  {venue?.data?.court_count}
                  {venue?.data?.court_type}
                </DoubleWrapper>
              ),
            }),

            新增數量: (
              <Form.Item name="add" rules={[{ required: true, message: '' }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            ),
          }}
        />
        <ButtonWrapper>
          <RippleButton
            category="solid"
            palette="main"
            onClick={handleAddCourt}
            loading={isLoading}
          >
            新增
          </RippleButton>
        </ButtonWrapper>
      </Card>
    </Container>
  );
}
