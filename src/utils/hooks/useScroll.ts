import { RefObject, useEffect } from 'react';

export const useScroll = (
  scrollableEl: RefObject<HTMLElement>,
  callback: EventListener
) => {
  useEffect(() => {
    const el = scrollableEl?.current;

    el?.addEventListener('scroll', callback, { passive: true });

    return () => {
      el?.removeEventListener('scroll', callback);
    };
  }, [scrollableEl, callback]);
};
