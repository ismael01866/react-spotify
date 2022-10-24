import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { useMePlaylistsAll } from 'hooks/services';
import { LibraryPlaylistsContext } from 'state';
import { IPlaylist } from 'types/playlist';

import { LibraryPlaylistsContent, LibraryPlaylistsHeader } from './components';

export function LibraryPlaylists() {
  const { playlists } = useMePlaylistsAll({ sort: 'name' });

  const [playlistsFiltered, setPlaylistsFiltered] = useState<IPlaylist[]>();

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
