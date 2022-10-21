import { createContext } from 'react';

export interface CollectionTracksContextProps {
  chunkSize: number;
}

export const CollectionTracksContext =
  createContext<CollectionTracksContextProps>({
    chunkSize: 0
  });
