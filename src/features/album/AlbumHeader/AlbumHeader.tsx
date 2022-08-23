import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { ButtonFollowAlbum } from 'src/components/Button/ButtonFollow';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { ImageAlbum } from 'src/components/Image/ImageAlbum';
import { useAlbumWithFollow } from 'src/lib/hooks/services';
import { AlbumContext } from '../AlbumContext';
import { AlbumBanner, AlbumMeta } from './components';

export function AlbumHeader() {
  const { albumID } = useContext(AlbumContext);
  const { album = {}, isLoading } = useAlbumWithFollow(albumID);

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
                <ButtonFollowAlbum album={album} />
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Skeleton>
  );
}
