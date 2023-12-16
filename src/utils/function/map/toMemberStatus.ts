import type { schemas } from '@/services/type';
import type { z } from 'zod';

import theme from '@/provider/theme/theme';

export type ReservationMemberStatusType = z.infer<(typeof schemas)['ReservationMemberStatus']>;

export default function toMemberStatus(status: ReservationMemberStatusType) {
  switch (status) {
    case 'INVITED':
      return theme.gray[500];
    case 'JOINED':
      return theme.sub[300];
    case 'REJECTED':
      return theme.red[500];
    default:
      status satisfies never;
      return theme.sub[300];
  }
}
