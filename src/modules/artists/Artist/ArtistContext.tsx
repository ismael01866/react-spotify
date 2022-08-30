import { createContext } from 'react';
import { IArtist } from 'src/types/artist';

export const ArtistContext = createContext<IArtist>({});
