import { useEffect } from 'react';

export default function useScrollObserver(
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
