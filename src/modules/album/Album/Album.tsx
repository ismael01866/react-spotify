import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useAlbumWithFollow } from 'hooks/services';
import { AlbumContext } from 'state';

import { AlbumContent, AlbumHeader } from './components';

export function Album() {
  const router = useRouter();

  const { id: albumID } = router.query;
  const { album = {}, isLoading } = useAlbumWithFollow(albumID);

  return (
    (!isLoading && (
      <Flex flexDirection={'column'} gap={16}>
        <AlbumContext.Provider value={album}>
          <AlbumHeader />
          <AlbumContent />
        </AlbumContext.Provider>
      </Flex>
    )) || <></>
  );
}
