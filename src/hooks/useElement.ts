import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

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

    const scrollObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          OnScroll?.(entry);
        }
      },
      { threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] },
    );

    scrollObserver.observe(element);

    return () => {
      scrollObserver.unobserve(element);
      scrollObserver.disconnect();
    };
  }, [OnScroll, element]);
}

export function useScrollToEnd(callback: () => void) {
  const element = useRef<HTMLDivElement>(null);

  const scrollToEnd = useMemo(
    () =>
      debounce(() => {
        if (element.current)
          if (
            Math.abs(
              element.current.scrollHeight -
                element.current.scrollTop -
                element.current.clientHeight,
            ) < 1
          )
            callback();
      }, 200),
    [callback],
  );

  useEffect(() => {
    const target = element.current;
    target?.addEventListener('scroll', scrollToEnd);
    return () => {
      target?.removeEventListener('scroll', scrollToEnd);
    };
  }, [element, scrollToEnd]);

  return element;
}
