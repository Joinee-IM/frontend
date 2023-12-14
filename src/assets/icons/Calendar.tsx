import type { Type } from '@/utils/type';

export default function CalendarIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      width="3em"
      height="3em"
      viewBox="0 0 106 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M105.616 13.5546H89.8825V3.06543H79.3933V13.5546H26.9474V3.06543H16.4582V13.5546H0.724487V118.446H105.616V13.5546ZM95.127 107.957H11.2137V39.7775H95.127V107.957Z"
        fill="currentColor"
      />
    </svg>
  );
}
