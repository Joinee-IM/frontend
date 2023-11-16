import { useState } from 'react';

export default function useImageDimension(source: string) {
  const [ratio, setRatio] = useState(0);
  const img = new Image();
  img.src = source;

  img.onload = () => {
    setRatio(img.width / img.height);
  };

  return { ratio, with: img.width, height: img.height };
}
