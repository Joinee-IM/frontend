import type { Type } from '@/utils/type';

export default function EmailIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 307 307"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M281.325 51.1506H25.575V255.751H281.325V51.1506ZM255.75 102.301L153.45 166.238L51.15 102.301V76.7256L153.45 140.663L255.75 76.7256V102.301Z"
        fill="currentColor"
      />
    </svg>
  );
}
