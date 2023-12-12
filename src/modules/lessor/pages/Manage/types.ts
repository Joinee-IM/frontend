import type { schemas } from '@/services/type';
import type { TableItemType } from '@/utils/type';
import type { Dispatch, Key, SetStateAction } from 'react';
import type { z } from 'zod';

export type StadiumTableItem = TableItemType<z.infer<(typeof schemas)['ViewProviderStadium']>>;
export type VenueTableItem = TableItemType<z.infer<(typeof schemas)['ViewProviderVenue']>>;
export type CourtTableItem = TableItemType<z.infer<(typeof schemas)['ViewProviderCourt']>>;

export type DataType = StadiumTableItem | VenueTableItem | CourtTableItem;

export interface TableBaseProps {
  data?: DataType[];
  setData?: Dispatch<SetStateAction<DataType[]>>;
  selectedRowKeys: Key[];
  setSelectedRowKeys: Dispatch<SetStateAction<Key[]>>;
}
