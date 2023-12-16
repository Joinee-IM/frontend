import type { Type } from '@/utils/type';

export function DirectionRightIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
      style={style}
      {...rest}
    >
      <path
        d="M9 0L7.41375 1.58625L13.6912 7.875H0V10.125H13.6912L7.41375 16.4137L9 18L18 9L9 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DirectionLeftIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
      style={style}
      {...rest}
    >
      <path
        d="M9 18L10.5862 16.4138L4.30875 10.125L18 10.125V7.875L4.30875 7.875L10.5862 1.58625L9 0L0 9L9 18Z"
        fill="currentColor"
      />
    </svg>
  );
}
