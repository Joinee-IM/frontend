import { setHours } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { ReservationFormDataType } from '@/modules/main/pages/Reserve';
import type { FormInstance } from 'antd';

import { RippleButton } from '@/components/Button';
import {
  useBrowseReservationMembers,
  useCancelReservation,
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
  const code = searchParams.get('code');
  const [cookie] = useCookies(['id', 'user-role']);

  const { data: reservation, refetch } = useReservationInfo(reservation_id);
  const {
    data: members,
    refetch: refetchReservationMembers,
    isFetched,
  } = useBrowseReservationMembers(reservation?.data?.id);

  const isMember = useMemo(
    () => members?.data?.find((member) => member.account_id === cookie.id),
    [cookie.id, members?.data],
  );

  const isManager = useMemo(
    () => members?.data?.find((member) => member.account_id === cookie.id && member.is_manager),
    [cookie.id, members?.data],
  );

  useEffect(() => {
    if (isFetched) {
      if (
        reservation?.data?.vacancy &&
        reservation?.data?.vacancy <= 0 &&
        !code &&
        !isMember &&
        reservation?.data?.is_cancelled
      )
        throw new Response('No Permission', {
          status: 403,
        });
    }
  }, [code, isFetched, isMember, reservation?.data?.is_cancelled, reservation?.data?.vacancy]);

  const court_id = reservation?.data?.court_id ?? searchParams.get('court_id');

  const { mutateAsync: createReservation, isLoading: createReservationLoading } =
    useCreateReservation(Number(court_id));

  const { mutateAsync: joinReservation, isLoading: loadingJoinReservation } = useJoinReservation(
    reservation?.data?.invitation_code ?? '',
  );
  const { mutateAsync: leaveReservation, isLoading: loadingLeaveReservation } = useLeaveReservation(
    Number(reservation?.data?.id),
  );

  const { mutateAsync: cancelReservation, isLoading: loadingCancelReservation } =
    useCancelReservation(Number(reservation?.data?.id));

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
    if (!cookie.id) {
      navigate('/auth/login');
    } else {
      await joinReservation(undefined);
      await refetch();
      await refetchReservationMembers();
    }
  };

  const handleLeaveReserve = async () => {
    try {
      await leaveReservation(null as never);
      await refetch();
      await refetchReservationMembers();
      navigate(`/history/${cookie.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelReserve = async () => {
    try {
      await cancelReservation(null as never);
      navigate(`/history/${cookie.id}`);
    } catch (e) {
      console.log(e);
    }
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
      return reservation?.data?.is_cancelled ? (
        <></>
      ) : isMember ? (
        isManager ? (
          <>
            <RippleButton
              category="outlined"
              palette="red"
              onClick={handleCancelReserve}
              loading={loadingCancelReservation}
            >
              取消預約
            </RippleButton>
          </>
        ) : (
          <>
            <RippleButton
              category="outlined"
              palette="red"
              onClick={handleLeaveReserve}
              loading={loadingLeaveReservation}
            >
              退出
            </RippleButton>
          </>
        )
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
