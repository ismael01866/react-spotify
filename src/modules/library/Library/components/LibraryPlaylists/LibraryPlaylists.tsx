import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LibraryPlaylistsContext } from 'src/state';
import { IPlaylist } from 'src/types/playlist';
import { useMePlaylistsAll } from 'src/utils/hooks/services';
import {
  LibraryPlaylistsContent,
  LibraryPlaylistsHeader
} from './components';

export function LibraryPlaylists() {
  const { playlists } = useMePlaylistsAll({ sort: 'name' });

  const [playlistsFiltered, setPlaylistsFiltered] =
    useState<IPlaylist[]>();

  useEffect(() => {
    if (!playlists) return;

    setPlaylistsFiltered(playlists);
  }, [playlists]);

  return (
    <Flex flexDirection={'column'} gap={12}>
      <LibraryPlaylistsContext.Provider
        value={{ playlists, playlistsFiltered, setPlaylistsFiltered }}
      >
        <LibraryPlaylistsHeader />
        <LibraryPlaylistsContent />
      </LibraryPlaylistsContext.Provider>
    </Flex>
  );
}
