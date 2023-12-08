import type { Type } from '@/utils/type';

export default function SearchIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M167.917 151.666H159.358L156.325 148.741C166.942 136.391 173.333 120.358 173.333 102.916C173.333 64.0248 141.808 32.4998 102.917 32.4998C64.025 32.4998 32.5 64.0248 32.5 102.916C32.5 141.808 64.025 173.333 102.917 173.333C120.358 173.333 136.392 166.941 148.742 156.325L151.667 159.358V167.916L205.833 221.975L221.975 205.833L167.917 151.666ZM102.917 151.666C75.9417 151.666 54.1667 129.891 54.1667 102.916C54.1667 75.9414 75.9417 54.1664 102.917 54.1664C129.892 54.1664 151.667 75.9414 151.667 102.916C151.667 129.891 129.892 151.666 102.917 151.666Z"
        fill="currentColor"
      />
    </svg>
  );
}
