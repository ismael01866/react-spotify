import { createContext } from 'react';
import { IAlbum } from 'src/types/album';

export const AlbumContext = createContext<IAlbum>({});
