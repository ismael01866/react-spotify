import { RefObject } from 'react';
import { useScroll } from './useScroll';

const defaultOptions = {
  scrollThreshold: 800
};

export const useInfiniteScroll = (
  scrollableEl: RefObject<HTMLElement>,
  callback: any,
  { scrollThreshold } = defaultOptions
) => {
  let oldScrollTop = scrollableEl?.current?.scrollTop || 0;

  const handleScroll: EventListener = (event: Event) => {
    const element = event?.target as HTMLElement;

    const scrollReachedBottom =
      element?.scrollHeight - element.scrollTop <=
      element?.clientHeight + scrollThreshold;

    const scrollDirectionIsDown = oldScrollTop < element.scrollTop;
    const shouldCallback = scrollReachedBottom && scrollDirectionIsDown;

    if (shouldCallback) callback();

    oldScrollTop = element.scrollTop;
  };

  useScroll(scrollableEl, handleScroll);
};
