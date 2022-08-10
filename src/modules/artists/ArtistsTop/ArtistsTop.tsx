import { Box, Heading } from '@chakra-ui/react';
import { FeaturedGridArtists } from 'src/features/playlists';

export function ArtistsTop() {
  return (
    <Box>
      <Heading fontSize={'2xl'}>Your Top Artists</Heading>

      <br />
      <FeaturedGridArtists limit={20} />
    </Box>
  );
}
