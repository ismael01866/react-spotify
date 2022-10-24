import { createContext } from 'react';

import { IArtist } from 'types/artist';

export const ArtistContext = createContext<IArtist>({});
