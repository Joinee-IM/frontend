import type { schemas } from '@/services/type';
import type { z } from 'zod';

import api from '@/services';

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
      getNextPageParam: (last) => {
        if (last.data) {
          if (last.data.offset + last.data.limit >= last.data.total_count) return undefined;
          else return { ...params, offset: Number(last.data?.offset) + Number(last.data?.limit) };
        } else return undefined;
      },
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
      getNextPageParam: (last) => {
        if (last.data && last.data.offset && last.data.limit) {
          if (last.data.offset + last.data.limit >= last.data.total_count) return undefined;
          else return { ...params, offset: Number(last.data?.offset) + Number(last.data?.limit) };
        } else return undefined;
      },
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
      getNextPageParam: (last) => {
        if (last.data && last.data.offset && last.data.limit) {
          if (last.data.offset + last.data.limit >= last.data.total_count) return undefined;
          else return { ...params, offset: Number(last.data?.offset) + Number(last.data?.limit) };
        } else return undefined;
      },
    },
  );
  return {
    courts: data?.pages.flatMap((page) => page.data?.data ?? []),
    ...rest,
    count: data?.pages?.[0].data?.total_count,
  };
};

export const useBatchEditVenues = () => api.usePatch('/api/venue/batch');
