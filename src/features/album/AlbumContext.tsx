import { createContext } from 'react';

export interface AlbumContextProps {
  albumID: string | string[];
}

export const AlbumContext = createContext<AlbumContextProps>({
  albumID: ''
});
