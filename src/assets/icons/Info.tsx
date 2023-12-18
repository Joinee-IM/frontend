import type { Type } from '@/utils/type';

export default function InfoIcon({ style, ...rest }: Type<'svg'>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...rest}
    >
      <path
        d="M100 12.5C51.6797 12.5 12.5 51.6797 12.5 100C12.5 148.32 51.6797 187.5 100 187.5C148.32 187.5 187.5 148.32 187.5 100C187.5 51.6797 148.32 12.5 100 12.5ZM93.75 57.8125C93.75 56.9531 94.4531 56.25 95.3125 56.25H104.688C105.547 56.25 106.25 56.9531 106.25 57.8125V110.938C106.25 111.797 105.547 112.5 104.688 112.5H95.3125C94.4531 112.5 93.75 111.797 93.75 110.938V57.8125ZM100 143.75C97.5467 143.7 95.2108 142.69 93.4936 140.937C91.7763 139.185 90.8144 136.829 90.8144 134.375C90.8144 131.921 91.7763 129.565 93.4936 127.813C95.2108 126.06 97.5467 125.05 100 125C102.453 125.05 104.789 126.06 106.506 127.813C108.224 129.565 109.186 131.921 109.186 134.375C109.186 136.829 108.224 139.185 106.506 140.937C104.789 142.69 102.453 143.7 100 143.75Z"
        fill="currentColor"
      />
    </svg>
  );
}