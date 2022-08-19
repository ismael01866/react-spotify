import { createContext } from 'react';

export interface ArtistContextProps {
  artistID: string | string[];
}

export const ArtistContext = createContext<ArtistContextProps>({
  artistID: ''
});
