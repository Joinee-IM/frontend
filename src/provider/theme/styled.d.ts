import type { Theme } from '@/provider/theme/theme';

import 'styled-components';

type GeneralType = { [K in string]: string | number | GeneralType };

declare module 'styled-components' {
  export interface DefaultTheme extends GeneralType, Theme {}
}
