import { createContext } from 'react';
import { IAlbum } from 'src/types/album';

export const BrowseNewReleasesContext = createContext<{ albums: IAlbum[] }>({
  albums: []
});
