import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { differenceInHours, setHours } from 'date-fns';
import { isNil } from 'lodash';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import type { TechnicalLevelType } from '@/utils/function/map';

import Loading from '@/assets/create.gif';
import { ButtonWrapper } from '@/components/Button';
import GridForm from '@/components/Grid/FormGrid';
import { useLoading } from '@/components/Loading/PageLoading';
import useError from '@/hooks/useError';
import Action from '@/modules/main/pages/Reserve/components/Action';
import useReservationForm from '@/modules/main/pages/Reserve/hooks/useData';
import { useCreateReservation, useReservationInfo } from '@/modules/main/pages/Reserve/services';
import { useVenueInfo } from '@/modules/main/pages/Venue/services';
import { hexToRgb } from '@/utils';
import { flexCenter, percentageOfFigma, rwdFontSize } from '@/utils/css';
import calculateTotalCost from '@/utils/function/money';

export interface ReservationFormDataType {
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
  const { mode, reservation_id } = useParams<{
    mode: 'edit' | 'create' | 'info';
    reservation_id: string;
  }>();

  const { data: reservation, isFetching: fetchingReservation } = useReservationInfo(
    Number(reservation_id),
  );

  const [searchParams] = useSearchParams();
  if (isNil(mode)) throw Error();
  const venue_id = reservation?.data?.venue_id ?? searchParams.get('venue_id');
  const court_id = reservation?.data?.court_id ?? searchParams.get('court_id');
  const date = searchParams.get('date');
  const time = searchParams.get('time')?.split(',').map(Number);

  const { data: venue } = useVenueInfo(Number(venue_id));
  const { data, isLoading } = useReservationForm({
    mode,
    reservation: reservation?.data,
  });

  const { context } = useLoading(
    [isLoading, fetchingReservation],
    mode === 'create' ? Loading : undefined,
    mode === 'create' ? '正在生成預約表單' : '請稍候',
  );

  const { error } = useCreateReservation(Number(court_id));

  const { context: errorContext } = useError(error, undefined);

  return (
    <>
      {context}
      {errorContext}
      <Container>
        <Card>
          <Title>{mode === 'create' ? '預約場地' : '詳細資料'}</Title>
          <GridForm
            style={{ padding: `0 ${percentageOfFigma(80).max}`, rowGap: percentageOfFigma(20).max }}
            form={form}
            data={data}
            labelStyles={{ ...(mode === 'info' && { 尋找球友: { alignSelf: 'flex-start' } }) }}
          />
          {mode !== 'info' && (
            <SumContainer>
              <div style={{ fontWeight: 600 }}>場地費用</div>
              <Form.Item noStyle shouldUpdate>
                {({ getFieldValue }) => {
                  const member_count = getFieldValue('member_count') as number | undefined;
                  return (
                    date &&
                    calculateTotalCost(venue?.data?.fee_type)(
                      differenceInHours(
                        setHours(new Date(date), Number(time?.[time?.length - 1]) + 1),
                        setHours(new Date(date), Number(time?.[0])),
                      ),
                      member_count ?? 0,
                      venue?.data?.fee_rate ?? 0,
                    )
                  );
                }}
              </Form.Item>
            </SumContainer>
          )}
          <ButtonWrapper>
            <Action mode={mode} form={form} reservation_id={Number(reservation_id)} />
          </ButtonWrapper>
        </Card>
      </Container>
    </>
  );
}
