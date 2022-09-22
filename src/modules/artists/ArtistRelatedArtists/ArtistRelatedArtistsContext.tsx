import { createContext } from 'react';
import { IArtist } from 'src/types/artist';

export const ArtistRelatedArtistsContext = createContext<IArtist[]>([]);
