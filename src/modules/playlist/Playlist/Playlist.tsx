import { useContext } from 'react';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { usePlaylistWithFollow } from 'hooks/services/usePlaylistWithFollow';
import { PlaylistContext, UserContext } from 'state';

import { PlaylistContent, PlaylistHeader } from './components';

export function Playlist() {
  const router = useRouter();
  const { id } = useContext(UserContext);

  const { id: playlistID } = router.query;
  const { playlist = {}, isLoading } = usePlaylistWithFollow(playlistID, {
    ids: id
  });

  return (
    (!isLoading && (
      <Flex flexDirection={'column'} gap={16}>
        <PlaylistContext.Provider value={playlist}>
          <PlaylistHeader />
          <PlaylistContent />
        </PlaylistContext.Provider>
      </Flex>
    )) || <></>
  );
}
