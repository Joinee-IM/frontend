import type { schemas } from '@/services/type';
import type { z } from 'zod';

import api from '@/services';
import { getNextPageParam } from '@/utils/service/browse';

type BrowseParamsProps = Exclude<
  z.infer<(typeof schemas)['StadiumSearchParameters']>,
  z.ZodTypeAny
>;

export const useBrowseStadium = (params: BrowseParamsProps) => {
  const { data, ...rest } = api.useImmutableInfiniteQuery(
    '/api/stadium/browse',
    params,
    undefined,
    {
      getPageParamList: () => ['limit', 'offset'],
      getNextPageParam: (last) => getNextPageParam(last, params),
    },
  );
  return { stadiums: data?.pages.flatMap((page) => page.data?.data ?? []), ...rest };
};

export const useStadiumInfo = (stadium_id: number) =>
  api.useGet('/api/stadium/:stadium_id', { params: { stadium_id } }, { enabled: !!stadium_id });
