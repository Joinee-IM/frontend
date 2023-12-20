import { setHours } from 'date-fns';
import { useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { ReservationFormDataType } from '@/modules/main/pages/Reserve';
import type { FormInstance } from 'antd';

import { RippleButton } from '@/components/Button';
import {
  useBrowseReservationMembers,
  useCreateReservation,
  useJoinReservation,
  useLeaveReservation,
  useReservationInfo,
} from '@/modules/main/pages/Reserve/services';
import { toISOString } from '@/utils/function/date';

interface ActionProps {
  mode: 'edit' | 'create' | 'info';
  form: FormInstance<ReservationFormDataType>;
  reservation_id: number;
}

export default function Action({ mode, form, reservation_id }: ActionProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  const time = searchParams.get('time')?.split(',').map(Number);
  const [cookie] = useCookies(['id', 'user-role']);

  const { data: reservation, refetch } = useReservationInfo(reservation_id);

  const court_id = reservation?.data?.court_id ?? searchParams.get('court_id');

  const { mutateAsync: createReservation, isLoading: createReservationLoading } =
    useCreateReservation(Number(court_id));
  const { data: members, refetch: refetchReservationMembers } = useBrowseReservationMembers(
    reservation?.data?.id,
  );
  const { mutateAsync: joinReservation, isLoading: loadingJoinReservation } = useJoinReservation(
    reservation?.data?.invitation_code ?? '',
  );
  const { mutateAsync: leaveReservation, isLoading: loadingLeaveReservation } = useLeaveReservation(
    Number(reservation?.data?.id),
  );

  const isMember = useMemo(
    () => members?.data?.find((member) => member.account_id === cookie.id),
    [cookie.id, members?.data],
  );

  const handleReserve = async () => {
    try {
      await form.validateFields();
      if (date) {
        const {
          remark = '',
          member_count,
          vacancy,
          technical_level,
          member_ids,
        } = form.getFieldsValue();
        const { data } = await createReservation({
          start_time: toISOString(setHours(new Date(date), Number(time?.[0]))),
          end_time: toISOString(setHours(new Date(date), Number(time?.[time?.length - 1]) + 1)),
          member_count,
          remark,
          vacancy,
          technical_level,
          member_ids,
        });
        navigate(`/reservation/info/${data?.id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleJoinReserve = async () => {
    await joinReservation(undefined);
    await refetch();
    await refetchReservationMembers();
  };

  const handleLeaveReserve = async () => {
    await leaveReservation(null as never);
    await refetch();
    await refetchReservationMembers();
  };

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
            onClick={() => navigate(`/reservation/info/${reservation_id}`)}
          >
            取消
          </RippleButton>
          <RippleButton category="solid" palette="main">
            儲存
          </RippleButton>
        </>
      );
    case 'info':
      return isMember ? (
        <>
          <RippleButton
            category="outlined"
            palette="red"
            onClick={handleLeaveReserve}
            loading={loadingLeaveReservation}
          >
            退出
          </RippleButton>
          <RippleButton
            category="solid"
            palette="main"
            onClick={() => navigate(`/reservation/edit/${reservation_id}`)}
          >
            編輯預約
          </RippleButton>
        </>
      ) : (
        <RippleButton
          category="solid"
          palette="main"
          onClick={handleJoinReserve}
          loading={loadingJoinReservation}
        >
          加入
        </RippleButton>
      );
    default:
      break;
  }
}
