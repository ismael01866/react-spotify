import { createContext } from 'react';

import { IArtist } from 'types/artist';

export const ArtistRelatedArtistsContext = createContext<IArtist[]>([]);
