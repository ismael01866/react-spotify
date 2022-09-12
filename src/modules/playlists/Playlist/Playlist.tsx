import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { usePlaylist } from 'src/utils/hooks/services';
import { PlaylistContent, PlaylistHeader } from './components';
import { PlaylistContext } from './PlaylistContext';

export function Playlist() {
  const router = useRouter();

  const { id: playlistID } = router.query;
  const { playlist = {}, isLoading } = usePlaylist(playlistID);

  return (
    (!isLoading && (
      <Flex flexDirection={'column'} gap={12}>
        <PlaylistContext.Provider value={playlist}>
          <PlaylistHeader />
          <PlaylistContent />
        </PlaylistContext.Provider>
      </Flex>
    )) || <></>
  );
}
