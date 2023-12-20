import type { schemas } from '@/services/type';
import type { z } from 'zod';

import api from '@/services';
import { getNextPageParam } from '@/utils/service/browse';

interface LessorBrowseStadiumProps {
  city_id?: number;
  district_id?: number;
  is_published?: boolean;
  sort_by?: z.infer<(typeof schemas)['sort_by__2']>;
  order?: z.infer<(typeof schemas)['order__2']>;
  limit?: number;
  offset?: number;
}

interface LessorBrowseVenueProps {
  stadium_id?: number;
  is_published?: boolean;
  sort_by?: z.infer<(typeof schemas)['sort_by__3']>;
  order?: z.infer<(typeof schemas)['order__2']>;
  limit?: number;
  offset?: number;
}

interface LessorBrowseCourtProps {
  stadium_id?: number;
  venue_id?: number;
  is_published?: boolean;
  sort_by?: z.infer<(typeof schemas)['sort_by__4']>;
  order?: z.infer<(typeof schemas)['order__2']>;
  limit?: number;
  offset?: number;
}

export const useLessorBrowseStadium = (params: LessorBrowseStadiumProps) => {
  const { data, ...rest } = api.useInfiniteQuery(
    '/api/view/stadium/provider',
    { queries: params },
    {
      getPageParamList: () => [],
      getNextPageParam: (last) => getNextPageParam(last, params),
    },
  );
  return {
    stadiums: data?.pages.flatMap((page) => page.data?.data ?? []),
    ...rest,
    count: data?.pages?.[0].data?.total_count,
  };
};

export const useLessorBrowseVenue = (params: LessorBrowseVenueProps) => {
  const { data, ...rest } = api.useInfiniteQuery(
    '/api/view/venue/provider',
    { queries: params },
    {
      getPageParamList: () => [],
      getNextPageParam: (last) => getNextPageParam(last, params),
    },
  );
  return {
    venues: data?.pages.flatMap((page) => page.data?.data ?? []),
    ...rest,
    count: data?.pages?.[0].data?.total_count,
  };
};

export const useLessorBrowseCourt = (params: LessorBrowseCourtProps) => {
  const { data, ...rest } = api.useInfiniteQuery(
    '/api/view/court/provider',
    { queries: params },
    {
      getPageParamList: () => [],
      getNextPageParam: (last) => getNextPageParam(last, params),
    },
  );
  return {
    courts: data?.pages.flatMap((page) => page.data?.data ?? []),
    ...rest,
    count: data?.pages?.[0].data?.total_count,
  };
};

export const useBatchEditVenues = () => api.usePatch('/api/venue/batch');
export const useBatchEditStadiums = () => api.usePatch('/api/stadium/batch');
export const useBatchEditCourts = () => api.usePatch('/api/court/batch');
