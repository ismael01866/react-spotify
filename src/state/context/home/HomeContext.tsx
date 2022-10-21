import { createContext } from 'react';
import { IArtist } from 'src/types/artist';

export interface HomeContextProps {
  artist: IArtist;
}

export const HomeContext = createContext<HomeContextProps>({
  artist: {}
});
