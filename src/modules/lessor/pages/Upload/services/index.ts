import api from '@/services';

export const useUploadStadium = () => api.usePost('/api/stadium');

export const useUploadVenue = () => api.usePost('/api/venue');

export const useUploadCourt = () => api.usePost('/api/court');
