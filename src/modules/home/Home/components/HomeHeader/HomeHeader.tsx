import { Box, HStack, Image, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { HeaderBanner, HeaderMetaImage } from 'src/components/Header';
import { ArtistEmptySkeleton } from 'src/modules/artists/components';
import { HomeContext } from 'src/modules/home/Home';
import { HomeMeta } from './components';

export function HomeHeader() {
  const { artist } = useContext(HomeContext);
  const { images, name } = artist;

  return (
    <Box pos={'relative'} mx={-12} mt={-12}>
      <Box boxSize={'full'} overflow={'hidden'} pos={'absolute'}>
        <HeaderBanner>
          <Image src={images?.[0]?.url} alt={name} />
        </HeaderBanner>
      </Box>

      <Box px={12} pt={24} pos={'relative'}>
        <HStack spacing={8}>
          <HeaderMetaImage mb={-4}>
            <Image
              alt={name}
              src={images?.[0]?.url}
              fallback={<ArtistEmptySkeleton />}
            />
          </HeaderMetaImage>

          <VStack alignItems={'flex-start'} spacing={8}>
            <HomeMeta artist={artist} />
            <HStack spacing={2}>
              <ButtonPlay
                colorScheme={'spotify'}
                context_uri={artist.uri}
                size={'lg'}
              >
                Play
              </ButtonPlay>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
