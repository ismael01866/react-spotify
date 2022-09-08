import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useArtist } from 'src/utils/hooks/services';
import { ArtistContext } from '../Artist/ArtistContext';
import {
  ArtistRelatedArtistsContent,
  ArtistRelatedArtistsHeader
} from './components';

export function ArtistRelatedArtists() {
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
          <ArtistRelatedArtistsHeader />
          <ArtistRelatedArtistsContent />
        </ArtistContext.Provider>
      </Flex>
    )) || <></>
  );
}
