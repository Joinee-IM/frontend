import type { Type } from '@/utils/type';

export default function ReserveIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      width="1em"
      height="0.9em"
      viewBox="0 0 134 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0V120H133.333V0H0ZM53.3333 93.3333H20V80H53.3333V93.3333ZM53.3333 66.6667H20V53.3333H53.3333V66.6667ZM53.3333 40H20V26.6667H53.3333V40ZM85.4667 80L66.6667 61.0667L76.0667 51.6667L85.4667 61.1333L106.6 40L116.067 49.4667L85.4667 80Z"
        fill="currentColor"
      />
    </svg>
  );
}
