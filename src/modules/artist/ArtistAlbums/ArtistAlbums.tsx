import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ArtistContext } from 'src/state';
import { useArtist } from 'src/utils/hooks/services';
import { ArtistAlbumsContent, ArtistAlbumsHeader } from './components';

export function ArtistAlbums() {
  const router = useRouter();

  const { id: artistID } = router.query;
  const { artist = {}, isLoading } = useArtist(artistID);

  return (
    (!isLoading && (
      <Flex flexDirection={'column'} gap={12}>
        <ArtistContext.Provider value={artist}>
          <ArtistAlbumsHeader />
          <ArtistAlbumsContent />
        </ArtistContext.Provider>
      </Flex>
    )) || <></>
  );
}
