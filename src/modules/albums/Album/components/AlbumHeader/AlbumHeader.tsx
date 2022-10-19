import { Box, HStack, Image, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { HeaderBanner, HeaderMetaImage } from 'src/components/Header';
import {
  AlbumButtonFollow,
  AlbumEmptySkeleton
} from 'src/modules/albums/components';
import { AlbumContext } from '../../AlbumContext';
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
        <HStack spacing={8}>
          <HeaderMetaImage mb={-4}>
            <Image
              alt={name}
              src={images?.[0]?.url}
              fallback={<AlbumEmptySkeleton />}
            />
          </HeaderMetaImage>

          <VStack alignItems={'flex-start'} spacing={8}>
            <AlbumMeta album={album} />
            <HStack spacing={2}>
              <ButtonPlay context_uri={album.uri} />
              <AlbumButtonFollow album={album} />
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
