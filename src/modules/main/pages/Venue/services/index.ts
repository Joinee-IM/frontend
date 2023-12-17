import type { schemas } from '@/services/type';
import type { z } from 'zod';

import api from '@/services';
import { getNextPageParam } from '@/utils/service/browse';

interface BrowseVenueProps {
  name?: string;
  stadium_id?: number;
  sport_id?: number;
  is_reservable?: boolean;
  sort_by?: z.infer<(typeof schemas)['sort_by']>;
  order?: z.infer<(typeof schemas)['Sorter']>;
  limit?: number;
  offset?: number;
}

export const useBrowseVenue = (params: BrowseVenueProps) => {
  const { data, ...rest } = api.useInfiniteQuery(
    '/api/venue',
    { queries: params },
    {
      getPageParamList: () => [],
      getNextPageParam: (last) => getNextPageParam(last, params),
      enabled: !!params.stadium_id,
    },
  );
  return {
    venues: data?.pages.flatMap((page) => page.data?.data ?? []),
    ...rest,
    count: data?.pages?.[0].data?.total_count,
  };
};

export const useVenueInfo = (venue_id: number) =>
  api.useGet('/api/venue/:venue_id', { params: { venue_id } }, { enabled: !!venue_id });

export const useVenueCourts = (venue_id: number) =>
  api.usePost('/api/venue/:venue_id/court', { params: { venue_id } });

export const useCourtReservations = (court_id: number) =>
  api.usePost('/api/court/:court_id/reservation/browse', { params: { court_id } });
