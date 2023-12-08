import { useEffect, useRef, useState } from 'react';

export default function useElement() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const element = useRef<HTMLDivElement>(null);

  return { width, setWidth, height, setHeight, top, setTop, left, setLeft, element };
}

export function useResizeObserver(
  element: HTMLDivElement | null,
  OnResize?: (e: ResizeObserverEntry) => void,
) {
  useEffect(() => {
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        OnResize?.(entry);
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, [OnResize, element]);
}

export function useScrollObserver(
  element: HTMLDivElement | null,
  OnScroll?: (e: IntersectionObserverEntry) => void,
) {
  useEffect(() => {
    if (!element) return;

    const resizeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          OnScroll?.(entry);
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, [OnScroll, element]);
}
