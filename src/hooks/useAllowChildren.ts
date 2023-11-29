import { throttle } from 'lodash';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import type { RefObject } from 'react';

export default function useAllowChildren(element: RefObject<HTMLDivElement>) {
  const [allowChildren, setAllowChildren] = useState<number | undefined>(undefined);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [children, setChildren] = useState(0);

  const handleResizeWindow = useMemo(
    () =>
      throttle(() => {
        const { current } = element;
        if (current) {
          const childWidth = current.children[0]?.clientWidth;
          const gap = (scrollWidth - children * childWidth) / (children - 1);
          const allow = Math.floor((current.clientWidth + gap) / (childWidth + gap));
          setAllowChildren(allow === children ? undefined : allow);
        }
      }, 300),
    [children, element, scrollWidth],
  );

  useLayoutEffect(() => {
    if (element.current) {
      setScrollWidth(element.current.scrollWidth);
      setChildren(element.current.children.length);
      handleResizeWindow();
    }
  }, [element, handleResizeWindow]);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('scroll', handleResizeWindow);
    };
  }, [element, handleResizeWindow]);

  return allowChildren;
}
