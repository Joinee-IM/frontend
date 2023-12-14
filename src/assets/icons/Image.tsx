import type { Type } from '@/utils/type';

export default function ImageIcon({ style, ...rest }: Type<'svg'>) {
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
        d="M15.75 15.75V2.25H2.25V15.75H15.75ZM6.375 10.125L8.25 12.3825L10.875 9L14.25 13.5H3.75L6.375 10.125Z"
        fill="currentColor"
      />
    </svg>
  );
}
