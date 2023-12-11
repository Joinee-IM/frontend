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
