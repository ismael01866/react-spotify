import { createContext } from 'react';
import { IPlaylist } from 'src/types/playlist';

export const BrowseFeaturedPlaylistsContext = createContext<{
  message: string;
  playlists: IPlaylist[];
}>({ message: '', playlists: [] });
