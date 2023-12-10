import type { schemas } from '@/services/type';
import type { z } from 'zod';

export type TechnicalLevelType = z.infer<(typeof schemas)['TechnicalType']>;

export default function toTechnicalLevel(technicalLevel: TechnicalLevelType) {
  switch (technicalLevel) {
    case 'ENTRY':
      return '入門';
    case 'INTERMEDIATE':
      return '中度';
    case 'ADVANCED':
      return '進階';
    default:
      technicalLevel satisfies never;
      return '';
  }
}
