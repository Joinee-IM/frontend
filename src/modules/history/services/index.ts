import type { schemas } from '@/services/type';
import type { z } from 'zod';

import api from '@/services';

type BrowseParamsProps = Exclude<
  z.infer<(typeof schemas)['app__processor__http__reservation__BrowseReservationParameters']>,
  z.ZodTypeAny
>;

export const useBrowseHistory = (account_id: number, params: BrowseParamsProps) => {
  const { data, ...rest } = api.useImmutableInfiniteQuery(
    '/api/view/my-reservation',
    { account_id, ...params },
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
