import { z } from 'zod';

import api from '@/services';
import { schemas } from '@/services/type';

type BrowseParamsProps = Exclude<
  z.infer<(typeof schemas)['StadiumSearchParameters']>,
  z.ZodTypeAny
>;

export const useBrowseStadium = (params: BrowseParamsProps) => {
  const { data, ...rest } = api.useImmutableInfiniteQuery('/stadium/browse', params, undefined, {
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
    // Number(last.data?.offset) + Number(last.data?.limit) >= last.data?.total_count
    //   ? {
    //       body: {
    //         ...params,
    //         offset: Number(last.data?.offset) + Number(last.data?.limit),
    //       },
    //     }
    //   : undefined,
  });
  return { stadiums: data?.pages.flatMap((page) => page.data?.data ?? []), ...rest };
};
