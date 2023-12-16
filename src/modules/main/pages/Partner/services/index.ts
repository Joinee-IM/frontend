import type { schemas } from '@/services/type';
import type { z } from 'zod';

import api from '@/services';

export const useBrowseReservation = (
  params: z.infer<
    (typeof schemas)['app__processor__http__reservation__BrowseReservationParameters']
  >,
) => {
  const { data, ...rest } = api.useImmutableInfiniteQuery(
    '/api/view/reservation',
    params,
    undefined,
    {
      getPageParamList: () => [],
      getPreviousPageParam: (next) => {
        if (next.data) {
          if (next.data.offset === 0) return undefined;
          else
            return {
              body: {
                ...params,
                offset: Number(next.data?.offset) - Number(next.data?.limit),
              },
            };
        } else return undefined;
      },
      getNextPageParam: (last) => {
        if (last.data && last.data.offset && last.data.limit) {
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
    },
  );
  return {
    reservations: data?.pages.flatMap((page) => page.data?.data ?? []),
    ...rest,
    count: data?.pages?.[0].data?.total_count,
  };
};
