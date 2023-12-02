import { z } from 'zod';

import { schemas } from '@/services/type';

export type GenderType = z.infer<(typeof schemas)['GenderType']>;

export default function toGender(gender: GenderType) {
  switch (gender) {
    case 'MALE':
      return '男';
    case 'FEMALE':
      return '女';
    case 'UNREVEALED':
      return '不願公開';
    case null:
      return '尚未選擇';
    default:
      gender satisfies never;
      return '不願公開';
  }
}
