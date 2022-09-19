import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from 'src/modules/users';
import { useBrowseFeaturedPlaylist } from 'src/utils/hooks/services';
import { BrowseFeaturedPlaylistsContext } from './BrowseFeaturedPlaylistsContext';
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
        <BrowseFeaturedPlaylistsContext.Provider
          value={{ message, playlists }}
        >
          <BrowseFeaturedPlaylistsHeader />
          <BrowseFeaturedPlaylistsContent />
        </BrowseFeaturedPlaylistsContext.Provider>
      </Flex>
    )) || <></>
  );
}
