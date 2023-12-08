import type { Type } from '@/utils/type';

export default function CloseIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 149 149"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M148.6 14.9661L133.634 0L74.3 59.3339L14.9661 0L0 14.9661L59.3339 74.3L0 133.634L14.9661 148.6L74.3 89.2661L133.634 148.6L148.6 133.634L89.2661 74.3L148.6 14.9661Z"
        fill="currentColor"
      />
    </svg>
  );
}
