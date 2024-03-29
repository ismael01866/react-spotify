import { createContext, Dispatch, SetStateAction } from 'react';

import { IPlaylist } from 'types/playlist';

interface LibraryPlaylistsContextProps {
  playlists?: IPlaylist[];
  playlistsFiltered?: IPlaylist[];
  setPlaylistsFiltered: Dispatch<SetStateAction<IPlaylist[] | undefined>>;
}

export const LibraryPlaylistsContext =
  createContext<LibraryPlaylistsContextProps>({
    setPlaylistsFiltered: function () {}
  });
