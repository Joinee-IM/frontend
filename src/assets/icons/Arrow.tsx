export const RightArrowIcon = ({ style, ...rest }: React.ComponentProps<'svg'>) => {
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

export const LeftArrowIcon = ({ style, ...rest }: React.ComponentProps<'svg'>) => {
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
