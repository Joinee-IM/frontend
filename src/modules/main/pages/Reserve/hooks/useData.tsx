import { Card as CardAntd, Form, InputNumber, Select, Switch, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { differenceInHours, format, setHours } from 'date-fns';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSearchParams } from 'react-router-dom';

import type { schemas } from '@/services/type';
import type { TechnicalLevelType } from '@/utils/function/map';
import type { z } from 'zod';

import CopyIcon from '@/assets/icons/Copy';
import { RippleButton } from '@/components';
import { GeneralGrid } from '@/components/Grid';
import { SearchSelect } from '@/components/Select';
import { RoundTag, RoundTagWrapper } from '@/components/Tag';
import { ENV } from '@/constants';
import {
  useBrowseReservationMembers,
  useSearchAccount,
} from '@/modules/main/pages/Reserve/services';
import { useBrowseStadium, useStadiumInfo } from '@/modules/main/pages/Stadium/services';
import { useBrowseVenue, useVenueCourts, useVenueInfo } from '@/modules/main/pages/Venue/services';
import { toTechnicalLevel } from '@/utils/function/map';
import toMemberStatus, { toMemberIcon } from '@/utils/function/map/toMemberStatus';
import calculateTotalCost from '@/utils/function/money';

interface FormDataProps {
  mode: 'edit' | 'create' | 'info';
  reservation?: z.infer<(typeof schemas)['Reservation']> | null;
}

export default function useReservationForm({ mode, reservation }: FormDataProps) {
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  const time = searchParams.get('time')?.split(',').map(Number);
  const stadium_id = reservation?.stadium_id ?? searchParams.get('stadium_id');
  const venue_id = reservation?.venue_id ?? searchParams.get('venue_id');
  const court_id = reservation?.court_id ?? searchParams.get('court_id');

  const { data: stadium, isLoading: fetchingStadiumInfo } = useStadiumInfo(Number(stadium_id));
  const { data: venue, isLoading: fetchingVenueInfo } = useVenueInfo(Number(venue_id));
  const { stadiums, isLoading: fetchingStadiums } = useBrowseStadium({ limit: 20, offset: 0 });
  const { venues, isLoading: fetchingVenues } = useBrowseVenue({
    limit: 20,
    offset: 0,
    stadium_id: Number(stadium_id),
  });
  const {
    data: courts,
    mutate: getCourts,
    isLoading: fetchingCourts,
  } = useVenueCourts(Number(venue_id));
  const { data: members, isFetching: fetchingReservationMembers } = useBrowseReservationMembers(
    reservation?.id,
  );
  const { mutateAsync: fetchAccounts } = useSearchAccount();

  useEffect(() => {
    getCourts({});
  }, [getCourts, venue_id]);

  const [copy, setCopy] = useState(false);

  useEffect(() => {
    if (copy) {
      const timer = setTimeout(() => {
        setCopy(false);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [copy]);

  return {
    data: {
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
          `第 ${courts?.data?.find((court) => court.id === Number(court_id))?.number} ${venue?.data
            ?.court_type}`
        ) : (
          <Form.Item name="court_id" initialValue={Number(court_id)}>
            <Select
              style={{ width: '100%' }}
              options={courts?.data?.map((court) => ({
                value: Number(court.id),
                label: `第 ${court.number} ${venue?.data?.court_type}`,
              }))}
            />
          </Form.Item>
        )),
      租借時間:
        mode === 'info'
          ? reservation &&
            `${format(new Date(reservation?.start_time), 'yyyy/MM/dd HH:mm')}-${format(
              new Date(reservation?.end_time),
              'HH:mm',
            )}`
          : date
          ? `${format(setHours(new Date(date), Number(time?.[0])), 'yyyy/MM/dd HH:mm')}-${format(
              setHours(new Date(date), Number(time?.[time?.length - 1]) + 1),
              'HH:mm',
            )}`
          : '',
      運動項目: (
        <RoundTagWrapper>
          <RoundTag>{venue?.data?.sport_name}</RoundTag>
        </RoundTagWrapper>
      ),
      預計使用人數:
        mode === 'info' ? (
          reservation?.member_count
        ) : (
          <Form.Item name="member_count" rules={[{ required: true, message: '' }]}>
            <InputNumber addonAfter="人" style={{ width: 120 }} min={0} />
          </Form.Item>
        ),
      ...(mode === 'info' &&
        reservation && {
          總花費: calculateTotalCost(venue?.data?.fee_type)(
            differenceInHours(new Date(reservation?.end_time), new Date(reservation?.start_time)),
            reservation?.member_count,
            venue?.data?.fee_rate ?? 0,
          ),
        }),
      邀請的成員:
        mode === 'info' ? (
          <RoundTagWrapper>
            {members?.data?.map((member, index) => (
              <RoundTag key={index} style={{ backgroundColor: toMemberStatus(member.status) }}>
                {toMemberIcon(member.status)}
                {member.nickname}
              </RoundTag>
            ))}
          </RoundTagWrapper>
        ) : (
          <Form.Item
            name="member_ids"
            initialValue={
              members?.data?.map((account) => ({
                label: account.nickname,
                value: account.id,
              })) ?? []
            }
          >
            <SearchSelect
              style={{ width: '100%' }}
              fetcher={async (query) => {
                const { data } = (await fetchAccounts({ query })) as {
                  data: z.infer<(typeof schemas)['Account']>[] | undefined | null;
                };
                return (
                  data?.map((account) => ({ label: account.nickname, value: account.id })) ?? []
                );
              }}
            />
          </Form.Item>
        ),
      ...(mode === 'info' && {
        邀請連結: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {`${ENV.domain}/reservation/code/${reservation?.invitation_code}`}
            <CopyToClipboard
              text={`${ENV.domain}/reservation/code/${reservation?.invitation_code}`}
            >
              <Tooltip title="copy to clipboard" open={copy}>
                <RippleButton
                  category="icon"
                  palette="gray"
                  onClick={() => {
                    setCopy(true);
                  }}
                >
                  <CopyIcon />
                </RippleButton>
              </Tooltip>
            </CopyToClipboard>
          </div>
        ),
      }),
      尋找球友:
        mode === 'info' ? (
          reservation?.vacancy !== -1 ? (
            <CardAntd>
              <GeneralGrid
                labelStyles={{ 備註: { alignSelf: 'flex-start' } }}
                data={{
                  徵求人數: reservation?.vacancy,
                  技術水準: (
                    <RoundTagWrapper>
                      {reservation?.technical_level.map((level, index) => (
                        <RoundTag key={index}>{toTechnicalLevel(level)}</RoundTag>
                      ))}
                    </RoundTagWrapper>
                  ),
                  備註: reservation?.remark,
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
      ...(mode !== 'info' && {
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
                            mode="multiple"
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
      }),
    },
    isLoading:
      fetchingStadiumInfo ||
      fetchingVenueInfo ||
      fetchingStadiums ||
      fetchingVenues ||
      fetchingCourts ||
      fetchingReservationMembers,
  };
}
