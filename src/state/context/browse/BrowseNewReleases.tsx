import { createContext } from 'react';

import { IAlbum } from 'types/album';

export const BrowseNewReleasesContext = createContext<{ albums: IAlbum[] }>({
  albums: []
});
