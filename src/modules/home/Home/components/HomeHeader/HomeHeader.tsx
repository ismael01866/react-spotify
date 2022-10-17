import { Box, HStack, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { ArtistButtonFollow } from 'src/modules/artists/components';
import { HomeContext } from 'src/modules/home/Home';
import { HomeBanner, HomeMeta } from './components';

export function HomeHeader() {
  const { artist } = useContext(HomeContext);

  return (
    <Box pos={'relative'}>
      <Box>
        <HomeBanner artist={artist} />
      </Box>
      <Box pos={'relative'}>
        <VStack alignItems={'flex-start'} p={4} spacing={8}>
          <HomeMeta artist={artist} />
          <HStack spacing={2}>
            <ButtonPlay context_uri={artist.uri} />
            <ArtistButtonFollow artist={artist} />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
