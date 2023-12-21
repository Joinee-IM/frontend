import type { schemas } from '@/services/type';
import type { z } from 'zod';

export type FeeType = z.infer<(typeof schemas)['FeeType']> | null;

export default function toFeeType(feeType?: FeeType) {
  switch (feeType) {
    case 'PER_HOUR':
      return '/小時';
    case 'PER_PERSON':
      return '/人';
    case 'PER_PERSON_PER_HOUR':
      return '/小時每人';
    case 'PER_RESERVATION':
    case undefined:
    case null:
      return '';
    default:
      feeType satisfies never;
      return '';
  }
}
