export default function Check({ style, ...rest }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 107 107"
      fill="none"
      style={style}
      {...rest}
    >
      <path
        d="M53.5 0C23.968 0 0 23.968 0 53.5C0 83.032 23.968 107 53.5 107C83.032 107 107 83.032 107 53.5C107 23.968 83.032 0 53.5 0ZM42.8 80.25L16.05 53.5L23.5935 45.9565L42.8 65.1095L83.4065 24.503L90.95 32.1L42.8 80.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
