import { HEX } from '@/utils/color/types';

type ThemeType = { [K in string]: HEX | ThemeType };

const theme = {
  main: {
    '100': '#D9F2F7' as HEX,
    '300': '#85BAD0' as HEX,
    '500': '#5988A1' as HEX,
    '700': '#284B63' as HEX,
  },
} satisfies ThemeType;

export type Theme = typeof theme;

export default theme;
