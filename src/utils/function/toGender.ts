import { z } from 'zod';

import { schemas } from '@/services/type';

type GenderType = z.infer<(typeof schemas)['GenderType']>;

export default function toGender(gender: GenderType) {
  switch (gender) {
    case 'MALE':
      return '男';
    case 'FEMALE':
      return '女';
    case 'UNREVEALED':
      return '尚未選擇';
    default:
      gender satisfies never;
      return '尚未選擇';
  }
}
