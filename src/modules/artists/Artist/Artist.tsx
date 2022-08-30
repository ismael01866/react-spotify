import { Flex, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useArtistWithFollow } from 'src/utils/hooks/services';
import { ArtistContext } from './ArtistContext';
import { ArtistContent, ArtistHeader } from './components';

export function Artist() {
  const router = useRouter();

  const { id: artistID } = router.query;
  const { artist = {}, isLoading } = useArtistWithFollow(artistID);

  return (
    <Flex flexDirection={'column'} gap={12}>
      {artistID && (
        <ArtistContext.Provider value={artist}>
          <Skeleton isLoaded={!isLoading}>
            <ArtistHeader />
          </Skeleton>

          <ArtistContent />
        </ArtistContext.Provider>
      )}
    </Flex>
  );
}
