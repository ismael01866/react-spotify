import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useArtist } from 'src/utils/hooks/services';
import { ArtistContext } from '../Artist/ArtistContext';
import { ArtistAlbumsContent, ArtistAlbumsHeader } from './components';

export function ArtistAlbums() {
  const router = useRouter();

  const { id: artistID } = router.query;
  const { artist = {}, isLoading } = useArtist(artistID);

  return (
    (!isLoading && (
      <Flex
        flexDirection={'column'}
        gap={12}
        height={'full'}
        overflow={'hidden'}
        mx={-12}
      >
        <ArtistContext.Provider value={artist}>
          <ArtistAlbumsHeader />
          <ArtistAlbumsContent />
        </ArtistContext.Provider>
      </Flex>
    )) || <></>
  );
}