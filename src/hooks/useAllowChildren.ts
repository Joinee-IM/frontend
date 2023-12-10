import { debounce } from 'lodash';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import type { RefObject } from 'react';

export default function useAllowChildren(element: RefObject<HTMLDivElement>) {
  const [allowChildren, setAllowChildren] = useState<number | undefined>(undefined);
  const [children, setChildren] = useState(0);

  const handleResizeWindow = useMemo(
    () =>
      debounce(() => {
        const { current } = element;
        if (current) {
          const styles = getComputedStyle(current);
          const childWidth = current.children[0]?.clientWidth;
          const gap = children === 1 ? 0 : parseFloat(styles.columnGap);
          const containerWidth =
            current.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
          const allow = Math.floor((containerWidth + gap) / (childWidth + gap));
          setAllowChildren(allow === children ? undefined : allow);
        }
      }, 100),
    [children, element],
  );

  useLayoutEffect(() => {
    if (element.current) {
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
