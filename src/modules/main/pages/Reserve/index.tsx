import { Card as CardAntd, Form, InputNumber, Select, Switch } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { differenceInHours, format, setHours } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import type { schemas } from '@/services/type';
import type { TechnicalLevelType } from '@/utils/function/map';
import type { z } from 'zod';

import Loading from '@/assets/create.gif';
import { ButtonWrapper, RippleButton } from '@/components/Button';
import { GeneralGrid } from '@/components/Grid';
import GridForm from '@/components/Grid/FormGrid';
import { useLoading } from '@/components/Loading/PageLoading';
import { SearchSelect } from '@/components/Select';
import { RoundTag, RoundTagWrapper } from '@/components/Tag';
import {
  useCreateReservation,
  useReservationInfo,
  useSearchAccount,
} from '@/modules/main/pages/Reserve/services';
import { useBrowseStadium, useStadiumInfo } from '@/modules/main/pages/Stadium/services';
import { useBrowseVenue, useVenueCourts, useVenueInfo } from '@/modules/main/pages/Venue/services';
import { hexToRgb } from '@/utils';
import { flexCenter, percentageOfFigma, rwdFontSize } from '@/utils/css';
import { toISOString } from '@/utils/function/date';
import { toTechnicalLevel } from '@/utils/function/map';
import calculateTotalCost from '@/utils/function/money';

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
  const { mode, reservation_id } = useParams<{
    mode: 'edit' | 'create' | 'info';
    reservation_id: string;
  }>();
  const { data: reservation } = useReservationInfo(
    reservation_id ? Number(reservation_id) : undefined,
  );

  const [searchParams] = useSearchParams();
  const stadium_id = useMemo(
    () => reservation?.data?.stadium_id ?? searchParams.get('stadium_id'),
    [reservation?.data?.stadium_id, searchParams],
  );
  const venue_id = reservation?.data?.venue_id ?? searchParams.get('venue_id');
  const court_id = reservation?.data?.court_id ?? searchParams.get('court_id');
  const date = searchParams.get('date');
  const time = searchParams.get('time')?.split(',').map(Number);
  const { stadiums, isLoading: fetchingStadiums } = useBrowseStadium({
    limit: 20,
    offset: 0,
  });
  const { venues, isLoading: fetchVenues } = useBrowseVenue({
    limit: 20,
    offset: 0,
    stadium_id: Number(stadium_id),
  });
  const { data: courts, isLoading: fetchingCourts } = useVenueCourts(Number(venue_id));
  const { data: stadium, isLoading: fetchingStadiumInfo } = useStadiumInfo(Number(stadium_id));
  const { data: venue, isLoading: fetchingVenueInfo } = useVenueInfo(Number(venue_id));
  const { mutateAsync } = useSearchAccount();
  const { mutateAsync: createReservation, isLoading: createReservationLoading } =
    useCreateReservation(Number(court_id));
  const navigate = useNavigate();

  const data = useMemo(() => {
    return {
      場館名稱:
        stadium_id &&
        (mode === 'info' ? (
          stadium?.data?.name
        ) : (
          <Form.Item name="stadium_id" initialValue={Number(stadium_id)}>
            <Select
              style={{ width: '100%' }}
              options={stadiums?.map((stadium) => ({
                value: stadium.id,
                label: stadium.name,
              }))}
            />
          </Form.Item>
        )),
      場地名稱:
        venue_id &&
        (mode === 'info' ? (
          venue?.data?.name
        ) : (
          <Form.Item name="venue_id" initialValue={Number(venue_id)}>
            <Select
              style={{ width: '100%' }}
              options={venues?.map((venue) => ({
                value: venue.id,
                label: venue.name,
              }))}
            />
          </Form.Item>
        )),
      小單位編號:
        court_id &&
        (mode === 'info' ? (
          courts?.data?.find((court) => court.id === Number(court_id))?.number
        ) : (
          <Form.Item name="court_id" initialValue={Number(court_id)}>
            <Select
              style={{ width: '100%' }}
              options={courts?.data?.map((court) => ({
                value: Number(court.id),
                label: court.number,
              }))}
            />
          </Form.Item>
        )),
      租借時間:
        mode === 'info'
          ? reservation?.data &&
            `${format(new Date(reservation?.data?.start_time), 'yyyy/MM/dd HH:mm')}-${format(
              new Date(reservation?.data?.end_time),
              'HH:mm',
            )}`
          : date &&
            `${format(setHours(new Date(date), Number(time?.[0])), 'yyyy/MM/dd HH:mm')}-${format(
              setHours(new Date(date), Number(time?.[time?.length - 1]) + 1),
              'HH:mm',
            )}`,
      運動項目: (
        <RoundTagWrapper>
          <RoundTag>{venue?.data?.sport_name}</RoundTag>
        </RoundTagWrapper>
      ),
      預計使用人數:
        mode === 'info' ? (
          reservation?.data?.member_count
        ) : (
          <Form.Item name="member_count" rules={[{ required: true, message: '' }]}>
            <InputNumber addonAfter="人" style={{ width: 120 }} min={0} />
          </Form.Item>
        ),
      ...(mode === 'info' &&
        reservation?.data && {
          總花費: calculateTotalCost(venue?.data?.fee_type)(
            differenceInHours(
              new Date(reservation?.data?.end_time),
              new Date(reservation?.data?.start_time),
            ),
            reservation?.data?.member_count,
            venue?.data?.fee_rate ?? 0,
          ),
        }),
      邀請的成員:
        mode === 'info' ? (
          ''
        ) : (
          <Form.Item name="member_ids" initialValue={[]}>
            <SearchSelect
              style={{ width: '100%' }}
              fetcher={async (query) => {
                const { data } = (await mutateAsync({ query })) as {
                  data: z.infer<(typeof schemas)['Account']>[] | undefined | null;
                };
                return (
                  data?.map((account) => ({ label: account.nickname, value: account.id })) ?? []
                );
              }}
            />
          </Form.Item>
        ),
      ...(mode === 'info' && { 邀請連結: reservation?.data?.invitation_code }),
      尋找球友:
        mode === 'info' ? (
          reservation?.data?.vacancy !== -1 ? (
            <CardAntd>
              <GeneralGrid
                labelStyles={{ 備註: { alignSelf: 'flex-start' } }}
                data={{
                  徵求人數: reservation?.data?.vacancy,
                  技術水準: (
                    <RoundTagWrapper>
                      {reservation?.data?.technical_level.map((level, index) => (
                        <RoundTag key={index}>{toTechnicalLevel(level)}</RoundTag>
                      ))}
                    </RoundTagWrapper>
                  ),
                  備註: reservation?.data?.remark,
                }}
              />
            </CardAntd>
          ) : (
            '無'
          )
        ) : (
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
    mode,
    mutateAsync,
    reservation?.data,
    stadium?.data?.name,
    stadium_id,
    stadiums,
    time,
    venue?.data?.fee_rate,
    venue?.data?.fee_type,
    venue?.data?.name,
    venue?.data?.sport_name,
    venue_id,
    venues,
  ]);

  const handleReserve = useCallback(async () => {
    try {
      await form.validateFields();
      if (date) {
        const { remark = '', member_count } = form.getFieldsValue();
        const { data } = await createReservation({
          start_time: toISOString(setHours(new Date(date), Number(time?.[0]))),
          end_time: toISOString(setHours(new Date(date), Number(time?.[time?.length - 1]) + 1)),
          member_count,
          remark,
        });
        navigate(`/reserve/info/${data?.id}`);
      }
    } catch (e) {
      console.log(e);
    }
  }, [createReservation, date, form, navigate, time]);

  const action = useMemo(() => {
    switch (mode) {
      case 'create':
        return (
          <>
            <RippleButton category="outlined" palette="gray" onClick={() => navigate(-1)}>
              取消
            </RippleButton>
            <RippleButton
              category="solid"
              palette="main"
              onClick={handleReserve}
              loading={createReservationLoading}
            >
              確定預約
            </RippleButton>
          </>
        );
      case 'edit':
        return (
          <>
            <RippleButton
              category="outlined"
              palette="gray"
              onClick={() => navigate(`/reserve/info/${reservation_id}`)}
            >
              取消
            </RippleButton>
            <RippleButton category="solid" palette="main">
              儲存
            </RippleButton>
          </>
        );
      case 'info':
        return (
          <>
            <RippleButton category="outlined" palette="red">
              退出
            </RippleButton>
            <RippleButton
              category="solid"
              palette="main"
              onClick={() => navigate(`/reserve/edit/${reservation_id}`)}
            >
              編輯預約
            </RippleButton>
          </>
        );
      default:
        break;
    }
  }, [createReservationLoading, handleReserve, mode, navigate, reservation_id]);

  const { context } = useLoading(
    [fetchingStadiums, fetchVenues, fetchingCourts, fetchingVenueInfo, fetchingStadiumInfo],
    Loading,
    '正在生成預約表單',
  );

  return (
    <>
      {context}
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
          <ButtonWrapper>{action}</ButtonWrapper>
        </Card>
      </Container>
    </>
  );
}
