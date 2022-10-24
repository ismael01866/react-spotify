import { createContext } from 'react';

import { IArtist } from 'types/artist';

export const UserMeTopArtistsContext = createContext<IArtist[]>([]);
