import type { schemas } from '@/services/type';
import type { z } from 'zod';

import api from '@/services';
import { getNextPageParam } from '@/utils/service/browse';

type BrowseHistoryParamsProps = Exclude<
  z.infer<(typeof schemas)['ViewMyReservationParams']>,
  z.ZodTypeAny
>;

export const useBrowseHistory = (params: BrowseHistoryParamsProps) => {
  const { data, ...rest } = api.useImmutableInfiniteQuery(
    '/api/view/my-reservation',
    params,
    undefined,
    {
      getPageParamList: () => ['limit', 'offset'],
      getNextPageParam: (last) => getNextPageParam(last, params),
    },
  );
  return { histories: data?.pages.flatMap((page) => page.data?.data ?? []), ...rest };
};
