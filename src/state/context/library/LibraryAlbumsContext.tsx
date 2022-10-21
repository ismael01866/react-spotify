import { createContext, Dispatch, SetStateAction } from 'react';
import { IAlbum } from 'src/types/album';

interface LibraryAlbumsContextProps {
  albums?: IAlbum[];
  albumsFiltered?: IAlbum[];
  setAlbumsFiltered: Dispatch<SetStateAction<IAlbum[] | undefined>>;
}

export const LibraryAlbumsContext =
  createContext<LibraryAlbumsContextProps>({
    setAlbumsFiltered: function () {}
  });
