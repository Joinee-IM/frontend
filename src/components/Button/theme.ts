import { css } from 'styled-components';

import ColorTheme from '@/provider/theme/theme';
import { HEX } from '@/utils/color/types';
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

export type ButtonThemeProps =
  | {
      type: 'outlined';
      theme: keyof (typeof buttonTheme)['outlined'];
    }
  | { type: 'solid'; theme: keyof (typeof buttonTheme)['solid'] }
  | { type: 'link'; theme: keyof (typeof buttonTheme)['link'] };

export default function getTheme({ type, theme }: ButtonThemeProps) {
  const base: Record<MouseEvent, { [x in Element]?: HEX | 'transparent' }> =
    buttonTheme[type][theme];

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
