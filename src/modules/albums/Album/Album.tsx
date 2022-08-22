import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  AlbumContent,
  AlbumContext,
  AlbumHeader
} from 'src/features/album';

export function Album() {
  const router = useRouter();

  const { id: albumID } = router.query;

  return (
    <Flex flexDirection={'column'} gap={12}>
      {albumID && (
        <AlbumContext.Provider value={{ albumID }}>
          <AlbumHeader />
          <AlbumContent />
        </AlbumContext.Provider>
      )}
    </Flex>
  );
}
