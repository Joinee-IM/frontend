import { css } from 'styled-components';

import type { HEX } from '@/utils/color/types';

import ColorTheme from '@/provider/theme/theme';
type Element = 'background' | 'border' | 'text';

type MouseEvent = 'normal' | 'hover' | 'active';

export const buttonTheme = {
  solid: {
    main: {
      normal: {
        background: ColorTheme.main[500],
        text: ColorTheme.white,
      },
      hover: { background: ColorTheme.main[300] },
      active: { background: ColorTheme.main[700] },
    },
    gray: {
      normal: {
        background: ColorTheme.main[500],
        text: ColorTheme.white,
      },
      hover: { background: ColorTheme.main[300] },
      active: { background: ColorTheme.main[700] },
    },
  },
  outlined: {
    main: {
      normal: {
        background: 'transparent',
        border: ColorTheme.main[500],
        text: ColorTheme.main[500],
      },
      hover: {
        background: ColorTheme.main[100],
      },
      active: {
        background: ColorTheme.main[300],
      },
    },
    gray: {
      normal: {
        background: 'transparent',
        border: ColorTheme.gray[700],
        text: ColorTheme.gray[700],
      },
      hover: {
        background: ColorTheme.gray[100],
      },
      active: {
        background: ColorTheme.gray[300],
      },
    },
  },
  link: {
    main: {
      normal: {
        background: 'transparent',
        text: ColorTheme.main[500],
      },
      hover: {
        text: ColorTheme.main[300],
      },
      active: {
        text: ColorTheme.main[700],
      },
    },
  },
} satisfies Record<
  'solid' | 'outlined' | 'link',
  Record<string, Record<MouseEvent, { [x in Element]?: HEX | 'transparent' }>>
>;

export type ButtonType = keyof typeof buttonTheme;
export type PaletteType<T extends ButtonType> = keyof (typeof buttonTheme)[T];

export interface ButtonThemeProps<T extends ButtonType> {
  category: T;
  palette: PaletteType<T>;
}

export default function getTheme<T extends ButtonType>({
  category,
  palette,
}: {
  category: T;
  palette: PaletteType<T>;
}) {
  const base = buttonTheme[category][palette] as Record<
    MouseEvent,
    { [x in Element]?: HEX | 'transparent' }
  >;

  return css`
    &:not([disabled]) {
      background-color: ${base.normal.background} !important;
      color: ${base.normal.text} !important;
      border-color: ${base.normal?.border ?? 'transparent'} !important;
      &:hover {
        background-color: ${base.hover.background} !important;
        color: ${base.hover.text} !important;
      }
      &:active {
        background-color: ${base.active.background} !important;
        color: ${base.active.text} !important;
      }
    }
    &:disabled {
      border-color: #d9d9d9 !important;
      color: rgba(0, 0, 0, 0.25) !important;
      background-color: rgba(0, 0, 0, 0.04) !important;
    }
  `;
}
