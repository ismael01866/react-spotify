import { createContext } from 'react';

import { IAlbum } from 'types/album';

export const AlbumContext = createContext<IAlbum>({});
