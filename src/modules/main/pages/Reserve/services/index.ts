import api from '@/services';

export const useSearchAccount = () => api.usePost('/api/account/search');

export const useCreateReservation = (court_id: number) =>
  api.usePost('/api/court/:court_id/reservation', { params: { court_id } });
