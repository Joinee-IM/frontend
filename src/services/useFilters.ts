import api from '@/services';

export const useCity = () => api.useGet('/api/city');

export const useDistrict = (city_id: number) =>
  api.useGet('/api/district', { queries: { city_id } });

export const useSports = () => api.useGet('/api/sport');
