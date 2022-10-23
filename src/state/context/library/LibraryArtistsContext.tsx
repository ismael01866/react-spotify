import { createContext, Dispatch, SetStateAction } from 'react';
import { IArtist } from 'src/types/artist';

interface LibraryArtistsContextProps {
  artists?: IArtist[];
  artistsFiltered?: IArtist[];
  setArtistsFiltered: Dispatch<SetStateAction<IArtist[] | undefined>>;
}

export const LibraryArtistsContext = createContext<LibraryArtistsContextProps>({
  setArtistsFiltered: function () {}
});
