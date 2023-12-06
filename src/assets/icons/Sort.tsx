import type { Type } from '@/utils/type';

export default function SortIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 192 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M23.9751 143.85H71.9251V127.867H23.9751V143.85ZM23.9751 47.9503V63.9337H167.825V47.9503H23.9751ZM23.9751 103.892H119.875V87.9087H23.9751V103.892Z"
        fill="currentColor"
      />
    </svg>
  );
}
