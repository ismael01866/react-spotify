import { createContext } from 'react';

import { IPlaylist } from 'types/playlist';

export const PlaylistContext = createContext<IPlaylist>({});
