import type { schemas } from '@/services/type';
import type { z } from 'zod';

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
