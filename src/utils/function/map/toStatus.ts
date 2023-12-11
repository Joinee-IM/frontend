import type { schemas } from '@/services/type';
import type { z } from 'zod';

export type StatusType = z.infer<(typeof schemas)['ReservationStatus']>;

export default function toStatus(status: StatusType) {
  switch (status) {
    case 'IN_PROGRESS':
      return '未結束';
    case 'CANCELLED':
      return '已取消';
    case 'FINISHED':
      return '已結束';
    default:
      status satisfies never;
      return '已結束';
  }
}
