import api from '@/services';

export const useUploadStadium = () => api.usePost('/api/stadium');
