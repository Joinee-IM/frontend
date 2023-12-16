import api from '@/services';

export const useSearchAccount = () => api.usePost('/api/account/search');

export const useCreateReservation = (court_id: number) =>
  api.usePost('/api/court/:court_id/reservation', { params: { court_id } });

export const useReservationInfo = (reservation_id?: number) =>
  api.useGet(
    '/api/reservation/:reservation_id',
    { params: { reservation_id: Number(reservation_id) } },
    { enabled: !!reservation_id },
  );

export const useJoinReservation = (invitation_code: string) =>
  api.usePost('/api/reservation/code/:invitation_code', { params: { invitation_code } });

export const useLeaveReservation = (reservation_id: number) =>
  api.useDelete('/api/reservation/:reservation_id/leave', { params: { reservation_id } });

export const useBrowseReservationMembers = (reservation_id?: number) =>
  api.useGet(
    '/api/reservation/:reservation_id/members',
    { params: { reservation_id: Number(reservation_id) } },
    { enabled: !!reservation_id },
  );
