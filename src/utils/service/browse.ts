import { isNil } from 'lodash';

interface BrowseData {
  data?:
    | {
        offset?: number | null | undefined;
        limit?: number | null | undefined;
        total_count: number;
      }
    | null
    | undefined;
}

export const getPreviousPageParam = <T extends BrowseData, K>(next: T, params: K) =>
  next.data && !isNil(next.data.offset) && !isNil(next.data.limit) && next.data.offset > 0
    ? {
        body: {
          ...params,
          offset: Math.max(0, next.data.offset - next.data.limit),
        },
      }
    : undefined;

export const getNextPageParam = <T extends BrowseData, K>(last: T, params: K) =>
  last.data &&
  !isNil(last.data.offset) &&
  !isNil(last.data.limit) &&
  last.data.offset + last.data.limit < last.data.total_count
    ? {
        body: {
          ...params,
          offset: last.data.offset + last.data.limit,
        },
      }
    : undefined;
