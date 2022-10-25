import { useContext } from 'react';
import { Box, HStack, Image, VStack } from '@chakra-ui/react';

import { ButtonPlay } from 'components/Button/ButtonPlay';
import { HeaderBanner, HeaderMetaImage } from 'components/Header';
import { ArtistEmptySkeleton } from 'modules/artist/components';
import { HomeContext } from 'state';

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
        <HStack gap={8}>
          <HeaderMetaImage mb={-4}>
            <Image
              alt={name}
              src={images?.[0]?.url}
              fallback={<ArtistEmptySkeleton />}
            />
          </HeaderMetaImage>

          <VStack alignItems={'flex-start'} gap={8}>
            <HomeMeta artist={artist} />
            <HStack gap={2}>
              <ButtonPlay
                context_uri={artist.uri}
                size={'lg'}
                w={'4xs'}
              ></ButtonPlay>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
