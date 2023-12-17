import { useState } from 'react';

import type { schemas } from '@/services/type';
import type { z } from 'zod';

export type Sorter = `${string}+${z.infer<(typeof schemas)['Sorter']>}`;

export const options: { label: string; key: Sorter }[] = [
  { label: '價格由高至低排序', key: 'FEE_RATE+DESC' },
  { label: '價格由低至高排序', key: 'FEE_RATE+ASC' },
  // { label: '使用人數由高至低排序', key: 'CURRENT_USER_COUNT+DESC' },
  // { label: '使用人數由低至高排序', key: 'CURRENT_USER_COUNT+ASC' },
];

export default function useSorter() {
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<z.infer<(typeof schemas)['Sorter']> | undefined>(undefined);

  function splitSorter(
    input: string,
  ): [string, z.infer<(typeof schemas)['Sorter']>] | [undefined, undefined] {
    const matches = input.split(/\+/);

    if (matches) {
      const [sort, order] = matches;
      return [sort, order as 'ASC' | 'DESC'];
    }

    return [undefined, undefined];
  }

  return { sort, setSort, order, setOrder, splitSorter };
}
