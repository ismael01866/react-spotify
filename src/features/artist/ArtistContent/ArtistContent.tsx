import { Box, Flex, Heading } from '@chakra-ui/react';
import { ArtistTablePopularTracks } from './components/ArtistTablePopularTracks';

export function ArtistContent() {
  return (
    <Flex flexDirection={'column'} gap={12}>
      <Box>
        <Heading fontSize={'2xl'}>Popular</Heading>

        <br />
        <ArtistTablePopularTracks />
      </Box>
    </Flex>
  );
}
