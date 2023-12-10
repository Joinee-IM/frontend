import type { schemas } from '@/services/type';
import type { z } from 'zod';

import api from '@/services';

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
      getNextPageParam: (last) => {
        if (last.data) {
          if (last.data.offset + last.data.limit >= last.data.total_count) return undefined;
          else
            return {
              body: {
                ...params,
                offset: Number(last.data?.offset) + Number(last.data?.limit),
              },
            };
        } else return undefined;
      },
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
  api.useGet('/api/venue/:venue_id/court', { params: { venue_id } });
