import { useEffect } from 'react';

export default function useResizeObserver(
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
