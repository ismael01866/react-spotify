import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from 'src/modules/users/User/UserContext';
import { usePlaylistWithFollow } from 'src/utils/hooks/services/usePlaylistWithFollow';
import { PlaylistContent, PlaylistHeader } from './components';
import { PlaylistContext } from './PlaylistContext';

export function Playlist() {
  const router = useRouter();
  const { id } = useContext(UserContext);

  const { id: playlistID } = router.query;
  const { playlist = {}, isLoading } = usePlaylistWithFollow(
    playlistID,
    { ids: id }
  );

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
