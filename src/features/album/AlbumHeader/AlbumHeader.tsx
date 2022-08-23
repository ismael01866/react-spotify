import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { ImageAlbum } from 'src/components/Image/ImageAlbum';
import { useAlbum } from 'src/lib/hooks/services';
import { AlbumContext } from '../AlbumContext';
import { AlbumBanner, AlbumMeta } from './components';

export function AlbumHeader() {
  const { albumID } = useContext(AlbumContext);
  const { album = {}, isLoading } = useAlbum(albumID);

  return (
    <Skeleton isLoaded={!isLoading}>
      <Box minH={'2xs'} pos={'relative'}>
        <Box
          left={0}
          top={0}
          pos={'absolute'}
          w={'full'}
          sx={{ transform: 'scale(1.5)' }}
        >
          <AlbumBanner album={album} />
        </Box>

        <Box pos={'relative'}>
          <HStack spacing={8}>
            <Box boxSize={'3xs'} mt={8}>
              <ImageAlbum album={album} />
            </Box>

            <VStack alignItems={'flex-start'} pt={6} spacing={8}>
              <AlbumMeta album={album} />

              <HStack spacing={2}>
                <ButtonPlay context_uri={album.uri} />
                {/* <AlbumButtonFollow album={album} /> */}
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Skeleton>
  );
}
