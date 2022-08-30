import { Flex, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAlbumWithFollow } from 'src/utils/hooks/services';
import { AlbumContext } from './AlbumContext';
import { AlbumContent, AlbumHeader } from './components';

export function Album() {
  const router = useRouter();

  const { id: albumID } = router.query;
  const { album = {}, isLoading } = useAlbumWithFollow(albumID);

  return (
    <Flex flexDirection={'column'} gap={12}>
      {!isLoading && (
        <AlbumContext.Provider value={album}>
          <Skeleton isLoaded={!isLoading}>
            <AlbumHeader />
          </Skeleton>

          <AlbumContent />
        </AlbumContext.Provider>
      )}
    </Flex>
  );
}
