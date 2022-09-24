import { createContext, RefObject } from 'react';

interface LayoutGridContextProps {
  contentElRef: RefObject<HTMLDivElement>;
}

export const LayoutGridContext = createContext<LayoutGridContextProps>({
  contentElRef: { current: null } as RefObject<HTMLDivElement>
});
