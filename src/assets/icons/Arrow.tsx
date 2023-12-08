import type { Type } from '@/utils/type';

export const RightArrowIcon = ({ style, ...rest }: Type<'svg'>) => {
  return (
    <svg
      width="1em"
      height="1.75em"
      viewBox="0 0 80 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M0.207526 12.1023L12.3098 7.22656e-05L80.0001 67.6905L12.3097 135.381L0.20752 123.279L55.7957 67.6905L0.207526 12.1023Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LeftArrowIcon = ({ style, ...rest }: Type<'svg'>) => {
  return (
    <svg
      width="1em"
      height="1.75em"
      viewBox="0 0 80 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M79.7925 127.898L67.6903 140L-0.000136805 72.3095L67.6903 4.61914L79.7925 16.7214L24.2043 72.3095L79.7925 127.898Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DownArrowIcon = ({ style, ...rest }: Type<'svg'>) => {
  return (
    <svg
      width="1.75em"
      height="1em"
      viewBox="0 0 140 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M12.1023 1.47008e-06L7.17366e-05 12.1022L67.6905 79.7926L135.381 12.1022L123.279 1.44318e-07L67.6905 55.5882L12.1023 1.47008e-06Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const UpArrowIcon = ({ style, ...rest }: Type<'svg'>) => {
  return (
    <svg
      width="1.75em"
      height="1em"
      viewBox="0 0 140 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M12.1023 79.7925L7.17366e-05 67.6903L67.6905 -0.000139764L135.381 67.6903L123.279 79.7925L67.6905 24.2043L12.1023 79.7925Z"
        fill="currentColor"
      />
    </svg>
  );
};
