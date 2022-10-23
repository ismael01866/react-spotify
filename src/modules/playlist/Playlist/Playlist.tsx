import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { PlaylistContext, UserContext } from 'src/state';
import { usePlaylistWithFollow } from 'src/utils/hooks/services/usePlaylistWithFollow';
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
