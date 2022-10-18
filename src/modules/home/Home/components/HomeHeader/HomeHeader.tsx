import { Box, HStack, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { ArtistButtonFollow } from 'src/modules/artists/components';
import { HomeContext } from 'src/modules/home/Home';
import { HomeBanner, HomeMeta, HomeMetaImage } from './components';

export function HomeHeader() {
  const { artist } = useContext(HomeContext);

  return (
    <Box pos={'relative'} mx={-12} mt={-12}>
      <Box boxSize={'full'} overflow={'hidden'} pos={'absolute'}>
        <HomeBanner artist={artist} />
      </Box>

      <Box px={12} pt={24} pos={'relative'}>
        <HStack spacing={8}>
          <HomeMetaImage artist={artist} />

          <VStack alignItems={'flex-start'} spacing={8}>
            <HomeMeta artist={artist} />
            <HStack spacing={2}>
              <ButtonPlay context_uri={artist.uri} />
              <ArtistButtonFollow artist={artist} />
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
