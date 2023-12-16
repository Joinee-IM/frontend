import type { schemas } from '@/services/type';
import type { z } from 'zod';

import api from '@/services';

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
    },
  );
  return { histories: data?.pages.flatMap((page) => page.data?.data ?? []), ...rest };
};
