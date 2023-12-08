import type { Type } from '@/utils/type';

export default function PositionIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      width="0.7em"
      height="1em"
      viewBox="0 0 112 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M56 0C25.04 0 0 25.04 0 56C0 98 56 160 56 160C56 160 112 98 112 56C112 25.04 86.96 0 56 0ZM56 76C44.96 76 36 67.04 36 56C36 44.96 44.96 36 56 36C67.04 36 76 44.96 76 56C76 67.04 67.04 76 56 76Z"
        fill="currentColor"
      />
    </svg>
  );
}
