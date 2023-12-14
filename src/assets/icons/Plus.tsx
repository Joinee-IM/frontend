import type { Type } from '@/utils/type';

export default function PlusIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      style={style}
      {...rest}
    >
      <path
        d="M16 9.14286H9.14286V16H6.85714V9.14286H0V6.85714H6.85714V0H9.14286V6.85714H16V9.14286Z"
        fill="currentColor"
      />
    </svg>
  );
}
