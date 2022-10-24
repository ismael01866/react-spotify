import { RefObject, useEffect, useState } from 'react';

export const useOnScreen = (
  refEl: RefObject<HTMLElement>,
  observerInits?: IntersectionObserverInit
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = refEl.current;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, observerInits);

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [refEl, observerInits]);

  return isIntersecting;
};
