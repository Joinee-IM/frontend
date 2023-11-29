import type { CSSProperties } from 'react';

export default function UploadIcon({ style }: { style?: CSSProperties }) {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 161 161"
      fill="none"
    >
      <path
        d="M31.1937 67.3516C35.7554 44.2078 56.0817 26.8333 80.5 26.8333C99.8871 26.8333 116.725 37.8349 125.11 53.9349C145.302 56.0816 161 73.1878 161 93.9166C161 116.121 142.955 134.167 120.75 134.167H33.5417C15.0267 134.167 0 119.14 0 100.625C0 82.9149 13.7521 68.5591 31.1937 67.3516ZM33.5417 120.75H120.75C135.575 120.75 147.583 108.742 147.583 93.9166C147.583 80.1645 137.32 68.6933 123.702 67.2845L116.524 66.5466L113.17 60.1737C106.797 47.8974 94.3192 40.2499 80.5 40.2499C62.9242 40.2499 47.7633 52.7274 44.3421 69.9678L42.3296 80.0303L32.0658 80.7683C21.6008 81.4391 13.4167 90.227 13.4167 100.625C13.4167 111.694 22.4729 120.75 33.5417 120.75ZM107.333 87.2083H90.2271V107.333H70.7729V87.2083H53.6667L80.5 60.3749L107.333 87.2083Z"
        fill="currentColor"
      />
    </svg>
  );
}