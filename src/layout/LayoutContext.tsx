import { createContext, RefObject } from 'react';

interface LayoutContextProps {
  contentElRef: RefObject<HTMLDivElement>;
}

export const LayoutContext = createContext<LayoutContextProps>({
  contentElRef: { current: null } as RefObject<HTMLDivElement>
});
