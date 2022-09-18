import { createContext } from 'react';
import { IArtist } from 'src/types/artist';

interface HomeContextProps {
  topArtists: IArtist[];
}

export const HomeContext = createContext<HomeContextProps>({
  topArtists: []
});
