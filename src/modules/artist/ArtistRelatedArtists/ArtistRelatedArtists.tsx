import { Flex } from '@chakra-ui/react';
import {
  ArtistRelatedArtistsContent,
  ArtistRelatedArtistsHeader
} from './components';

export function ArtistRelatedArtists() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <ArtistRelatedArtistsHeader />
      <ArtistRelatedArtistsContent />
    </Flex>
  );
}
