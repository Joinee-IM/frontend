import { Card as CardAntd, Form, InputNumber, Select, Switch } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { format, formatISO, formatISO9075, setHours } from 'date-fns';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import type { TechnicalLevelType } from '@/utils/function/map';

import { ButtonWrapper, RippleButton } from '@/components/Button';
import { GeneralGrid } from '@/components/Grid';
import GridForm from '@/components/Grid/FormGrid';
import { SearchSelect } from '@/components/Select';
import { RoundTag, RoundTagWrapper } from '@/components/Tag';
import { useCreateReservation, useSearchAccount } from '@/modules/main/pages/Reserve/services';
import { useBrowseStadium } from '@/modules/main/pages/Stadium/services';
import { useBrowseVenue, useVenueCourts, useVenueInfo } from '@/modules/main/pages/Venue/services';
import { hexToRgb } from '@/utils';
import { flexCenter, percentageOfFigma, rwdFontSize } from '@/utils/css';
import { toTechnicalLevel } from '@/utils/function/map';

interface ReservationFormDataType {
  stadium_id: string;
  venue_id: string;
  court_id: string;
  member_count: number;
  member_ids: number[];
  vacancy_switch: boolean;
  vacancy: number;
  technical_level: TechnicalLevelType[];
  remark: string;
}

const Container = styled.div`
  padding: ${percentageOfFigma(100).max} ${percentageOfFigma(380).max};
  width: 100%;
  box-sizing: border-box;
  ${flexCenter}
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px ${hexToRgb('#000000', 0.25)};
  padding: ${percentageOfFigma(40).max} ${percentageOfFigma(50).max};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: ${percentageOfFigma(50).max};
  flex: 1;
`;

const Title = styled.div`
  ${rwdFontSize(30)};
  font-weight: 600;
`;

const SumContainer = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
  border-top: ${({ theme }) => `1px solid ${theme.gray[700]}`};
  padding-top: ${percentageOfFigma(16).vh};
  column-gap: ${percentageOfFigma(50).max};
`;

export default function Reserve() {
  const [form] = useForm<ReservationFormDataType>();
  const [searchParams] = useSearchParams();
  const stadium_id = searchParams.get('stadium_id');
  const venue_id = searchParams.get('venue_id');
  const court_id = searchParams.get('court_id');
  const date = searchParams.get('date');
  const time = searchParams.get('time')?.split(',').map(Number);
  const { stadiums } = useBrowseStadium({
    limit: 20,
    offset: 0,
  });
  const { venues } = useBrowseVenue({
    limit: 20,
    offset: 0,
    stadium_id: Number(stadium_id),
  });
  const { data: courts } = useVenueCourts(Number(venue_id));
  const { data: venue } = useVenueInfo(Number(venue_id));
  const { mutateAsync } = useSearchAccount();
  const { mutate: createReservation } = useCreateReservation(Number(court_id));

  const handleReserve = async () => {
    try {
      await form.validateFields();
      if (date) {
        const { remark = '', member_count } = form.getFieldsValue();
        createReservation({
          start_time: formatISO9075(setHours(new Date(date), Number(time?.[0]))),
          end_time: formatISO(setHours(new Date(date), Number(time?.[time?.length - 1]) + 1)),
          member_count,
          remark,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const data = useMemo(() => {
    return {
      場館名稱: (
        <Form.Item name="stadium_id" initialValue={Number(stadium_id)}>
          <Select
            style={{ width: '100%' }}
            options={stadiums?.map((stadium) => ({
              value: stadium.id,
              label: stadium.name,
            }))}
          />
        </Form.Item>
      ),
      場地名稱: (
        <Form.Item name="venue_id" initialValue={Number(venue_id)}>
          <Select
            style={{ width: '100%' }}
            options={venues?.map((venue) => ({
              value: venue.id,
              label: venue.name,
            }))}
          />
        </Form.Item>
      ),
      小單位編號: (
        <Form.Item name="court_id" initialValue={Number(court_id)}>
          <Select
            style={{ width: '100%' }}
            options={courts?.data?.map((court) => ({
              value: Number(court.id),
              label: court.number,
            }))}
          />
        </Form.Item>
      ),
      租借時間:
        date &&
        `${format(setHours(new Date(date), Number(time?.[0])), 'yyyy/MM/dd HH:mm')}-${format(
          setHours(new Date(date), Number(time?.[time?.length - 1]) + 1),
          'HH:mm',
        )}`,
      運動項目: (
        <RoundTagWrapper>
          <RoundTag>{venue?.data?.sport_name}</RoundTag>
        </RoundTagWrapper>
      ),
      預計使用人數: (
        <Form.Item name="member_count" rules={[{ required: true, message: '' }]}>
          <InputNumber addonAfter="人" style={{ width: 120 }} min={0} />
        </Form.Item>
      ),
      邀請的成員: (
        <Form.Item name="member_ids" initialValue={[]}>
          <SearchSelect
            style={{ width: '100%' }}
            fetcher={(query) =>
              mutateAsync({ query }).then(
                (data) =>
                  data?.data?.map((account) => ({
                    value: account.id,
                    label: account.nickname,
                  })) ?? [],
              )
            }
          />
        </Form.Item>
      ),
      尋找球友: (
        <Form.Item name="vacancy_switch" valuePropName="checked">
          <Switch />
        </Form.Item>
      ),
      '': (
        <Form.Item shouldUpdate noStyle>
          {({ getFieldValue }) => {
            const vacancy = getFieldValue('vacancy_switch') as boolean;
            const technical_level: TechnicalLevelType[] = ['ENTRY', 'INTERMEDIATE', 'ADVANCED'];

            return vacancy ? (
              <CardAntd>
                <GeneralGrid
                  labelStyles={{ 備註: { alignSelf: 'flex-start' } }}
                  data={{
                    徵求人數: (
                      <Form.Item name="vacancy">
                        <InputNumber addonAfter="人" style={{ width: '100%' }} min={0} />
                      </Form.Item>
                    ),
                    技術水準: (
                      <Form.Item name="technical_level">
                        <Select
                          style={{ width: '100%' }}
                          options={technical_level.map((level) => ({
                            value: level,
                            label: toTechnicalLevel(level),
                          }))}
                        />
                      </Form.Item>
                    ),
                    備註: (
                      <Form.Item name="remark" initialValue={''}>
                        <TextArea rows={4} />
                      </Form.Item>
                    ),
                  }}
                />
              </CardAntd>
            ) : null;
          }}
        </Form.Item>
      ),
    };
  }, [
    court_id,
    courts?.data,
    date,
    mutateAsync,
    stadium_id,
    stadiums,
    time,
    venue?.data?.sport_name,
    venue_id,
    venues,
  ]);

  return (
    <Container>
      <Card>
        <Title>預約場地</Title>
        <GridForm
          style={{ padding: `0 ${percentageOfFigma(80).max}`, rowGap: percentageOfFigma(20).max }}
          form={form}
          data={data}
        />
        <SumContainer>
          <div style={{ fontWeight: 600 }}>場地費用</div>
          <div>160 元</div>
        </SumContainer>
        <ButtonWrapper>
          <RippleButton category="outlined" palette="gray">
            取消
          </RippleButton>
          <RippleButton category="solid" palette="main" onClick={handleReserve}>
            確定預約
          </RippleButton>
        </ButtonWrapper>
      </Card>
    </Container>
  );
}
