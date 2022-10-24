import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ArtistContext } from 'src/state';
import { useArtistWithFollow } from 'src/hooks/services';
import { ArtistContent, ArtistHeader } from './components';

export function Artist() {
  const router = useRouter();

  const { id: artistID } = router.query;
  const { artist = {}, isLoading } = useArtistWithFollow(artistID);

  return (
    (!isLoading && (
      <Flex flexDirection={'column'} gap={16}>
        <ArtistContext.Provider value={artist}>
          <ArtistHeader />
          <ArtistContent />
        </ArtistContext.Provider>
      </Flex>
    )) || <></>
  );
}
