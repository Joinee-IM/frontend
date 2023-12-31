import type { Type } from '@/utils/type';

export default function FilterIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      style={style}
      width="1em"
      height="1em"
      viewBox="0 0 439 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M0 53.381C328.824 53.381 429.299 53.381 438.433 53.381"
        stroke="currentColor"
        strokeWidth="40"
      />
      <circle
        cx="332.383"
        cy="53.3806"
        r="38.3806"
        fill="white"
        stroke="currentColor"
        strokeWidth="30"
      />
      <path
        d="M0 346.62C328.824 346.62 429.299 346.62 438.433 346.62"
        stroke="currentColor"
        strokeWidth="40"
      />
      <circle
        cx="329.536"
        cy="346.619"
        r="38.3806"
        fill="white"
        stroke="currentColor"
        strokeWidth="30"
      />
      <path
        d="M0 199.998C328.824 199.998 429.299 199.998 438.433 199.998"
        stroke="currentColor"
        strokeWidth="40"
      />
      <circle
        cx="104.626"
        cy="200"
        r="38.3806"
        fill="white"
        stroke="currentColor"
        strokeWidth="30"
      />
    </svg>
  );
}
