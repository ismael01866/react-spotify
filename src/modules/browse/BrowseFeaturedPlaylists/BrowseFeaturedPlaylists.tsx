import { useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import { useBrowseFeaturedPlaylist } from 'hooks/services';
import { BrowseFeaturedPlaylistsContext, UserContext } from 'state';

import {
  BrowseFeaturedPlaylistsContent,
  BrowseFeaturedPlaylistsHeader
} from './components';

export function BrowseFeaturedPlaylists() {
  const { country } = useContext(UserContext);
  const limit = 50;

  const {
    data: { message = '', playlists = [] },
    isLoading
  } = useBrowseFeaturedPlaylist({
    limit,
    country
  });

  return (
    (!isLoading && (
      <Flex flexDirection={'column'} gap={12}>
        <BrowseFeaturedPlaylistsContext.Provider value={{ message, playlists }}>
          <BrowseFeaturedPlaylistsHeader />
          <BrowseFeaturedPlaylistsContent />
        </BrowseFeaturedPlaylistsContext.Provider>
      </Flex>
    )) || <></>
  );
}
