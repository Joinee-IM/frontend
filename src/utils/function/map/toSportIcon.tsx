import type { schemas } from '@/services/type';
import type { z } from 'zod';

import {
  BadmintonIcon,
  DanceIcon,
  JudoIcon,
  SquashIcon,
  TableTennisIcon,
} from '@/assets/icons/sport';

export type SportType = z.infer<(typeof schemas)['Sport']>;

export default function toSportIcon(sport?: string) {
  switch (sport) {
    case '桌球':
      return TableTennisIcon;
    case '羽球':
      return BadmintonIcon;
    case '壁球':
      return SquashIcon;
    case '柔道':
      return JudoIcon;
    case '舞蹈':
      return DanceIcon;
    default:
      return undefined;
  }
}
