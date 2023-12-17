import type { schemas } from '@/services/type';
import type { z } from 'zod';

import api from '@/services';
import { getNextPageParam, getPreviousPageParam } from '@/utils/service/browse';

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
      getPreviousPageParam: (next) => getPreviousPageParam(next, params),
      getNextPageParam: (last) => getNextPageParam(last, params),
    },
  );
  return {
    reservations: data?.pages.flatMap((page) => page.data?.data ?? []),
    ...rest,
    count: data?.pages?.[0].data?.total_count,
  };
};
