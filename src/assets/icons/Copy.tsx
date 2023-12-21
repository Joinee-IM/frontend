import type { Type } from '@/utils/type';

export default function CopyIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      width="1em"
      height="1.15em"
      viewBox="0 0 165 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M121.145 0H0V138.182H17.3064V17.2727H121.145V0ZM164.411 34.5455H34.6129V190H164.411V34.5455ZM147.105 172.727H51.9193V51.8182H147.105V172.727Z"
        fill="currentColor"
      />
    </svg>
  );
}
