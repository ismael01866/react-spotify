import { useContext } from 'react';
import { Box, HStack, Image, VStack } from '@chakra-ui/react';

import { ButtonPlay } from 'components/Button/ButtonPlay';
import { HeaderBanner, HeaderMetaImage } from 'components/Header';
import {
  AlbumButtonFollow,
  AlbumEmptySkeleton
} from 'modules/album/components';
import { AlbumContext } from 'state';

import { AlbumMeta } from './components';

export function AlbumHeader() {
  const album = useContext(AlbumContext);
  const { images, name } = album;

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
              fallback={<AlbumEmptySkeleton />}
            />
          </HeaderMetaImage>

          <VStack alignItems={'flex-start'} gap={8}>
            <AlbumMeta album={album} />
            <HStack gap={2}>
              <ButtonPlay context_uri={album.uri} />
              <AlbumButtonFollow album={album} />
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
