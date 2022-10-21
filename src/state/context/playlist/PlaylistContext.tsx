import { createContext } from 'react';
import { IPlaylist } from 'src/types/playlist';

export const PlaylistContext = createContext<IPlaylist>({});
