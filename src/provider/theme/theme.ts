import { HEX } from '@/utils/color/types';

type ThemeType = { [K in string]: HEX | ThemeType };

const theme = {
  main: {
    '100': '#D9F2F7' as HEX,
    '300': '#85BAD0' as HEX,
    '500': '#5988A1' as HEX,
    '700': '#284B63' as HEX,
  },
  gray: {
    '100': '#F4F4F4' as HEX,
    '300': '#EAEAEA' as HEX,
    '500': '#C2C2C2' as HEX,
    '700': '#858585' as HEX,
    '900': '#353535' as HEX,
  },
  white: '#FFFFFF',
} satisfies ThemeType;

export type Theme = typeof theme;

export default theme;
