import { Box, Heading } from '@chakra-ui/react';

export function ArtistRelatedArtistsHeader() {
  return (
    <Box flexShrink={0} px={12}>
      <Heading fontSize={'3xl'}>Related artists</Heading>
    </Box>
  );
}
