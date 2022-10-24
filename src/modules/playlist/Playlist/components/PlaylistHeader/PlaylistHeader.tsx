import { useContext } from 'react';
import { Box, HStack, Image, VStack } from '@chakra-ui/react';

import { ButtonPlay } from 'components/Button/ButtonPlay';
import { HeaderBanner, HeaderMetaImage } from 'components/Header';
import {
  PlaylistButtonFollow,
  PlaylistEmptySkeleton
} from 'modules/playlist/components';
import { PlaylistContext } from 'state';

import { PlaylistMeta } from './components';

export function PlaylistHeader() {
  const playlist = useContext(PlaylistContext);
  const { name, images } = playlist;

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
              fallback={<PlaylistEmptySkeleton />}
            />
          </HeaderMetaImage>

          <VStack alignItems={'flex-start'} spacing={8}>
            <PlaylistMeta playlist={playlist} />

            <HStack spacing={2}>
              <ButtonPlay context_uri={playlist.uri} />
              <PlaylistButtonFollow playlist={playlist} />
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
