import { Box, Heading } from '@chakra-ui/react';
import { FeaturedGridArtists } from 'src/modules/home/Home/components';

export function ArtistsTop() {
  return (
    <Box>
      <Heading fontSize={'2xl'}>Your Top Artists</Heading>

      <br />
      <FeaturedGridArtists
        limit={20}
        columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
      />
    </Box>
  );
}
