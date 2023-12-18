import type { Type } from '@/utils/type';

export default function CloseWithBackGroundIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <circle cx="17" cy="17" r="17" fill="white" />
      <path
        d="M26.7142 9.24244L24.7575 7.28571L16.9999 15.0433L9.24238 7.28571L7.28564 9.24244L15.0432 17L7.28564 24.7575L9.24238 26.7143L16.9999 18.9567L24.7575 26.7143L26.7142 24.7575L18.9567 17L26.7142 9.24244Z"
        fill="#DE6D62"
      />
    </svg>
  );
}
